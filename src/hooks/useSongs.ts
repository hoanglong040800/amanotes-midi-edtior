import { useState } from "react";
import type { Song } from "../types/song.types";
import { StorageKey } from "../enums/common.enum";

const SAMPLE_SONGS_URL = "/src/data/sample-songs.json";

async function fetchSongsFromSource(): Promise<Song[]> {
	const response = await fetch(SAMPLE_SONGS_URL);
	if (!response.ok) {
		throw new Error("Failed to load songs.");
	}

	const data = (await response.json()) as Song[];
	localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(data));
	return data;
}

async function getSongs(): Promise<Song[]> {
	const cached = localStorage.getItem(StorageKey.CACHED_SONGS);

	if (cached) {
		return JSON.parse(cached) as Song[];
	}

	return fetchSongsFromSource();
}

export type LoadSingleSongResult = {
	song: Song | null;
	error: string | null;
};

export async function loadSingleSong(songId?: string): Promise<LoadSingleSongResult> {
	if (songId === undefined) {
		return { song: null, error: "Missing song identifier." };
	}

	const index = Number(songId);

	if (Number.isNaN(index) || index < 0) {
		return { song: null, error: "Invalid song identifier." };
	}

	try {
		const songs = await getSongs();
		const song = songs[index] ?? null;
		return song ? { song, error: null } : { song: null, error: "Song not found." };
	} catch {
		return { song: null, error: "Unable to load song." };
	}
}

export async function loadSongsFromCache(): Promise<Song[]> {
	return getSongs();
}

export function useSongs() {
	const [songs, setSongs] = useState<Song[]>([]);
	const [loading, setLoading] = useState(false);

	async function loadSongs() {
		setLoading(true);

		try {
			const data = await getSongs();
			setSongs(data);
		} catch {
			setSongs([]);
		} finally {
			setLoading(false);
		}
	}

	function onCreateSong(song: Song) {
		setSongs((prevSongs) => {
			const updatedSongs = [...prevSongs, song];
			localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(updatedSongs));
			return updatedSongs;
		});
	}

	function onUpdateSong(index: number, song: Song) {
		setSongs((prevSongs) => {
			if (index < 0 || index >= prevSongs.length) {
				return prevSongs;
			}

			const updatedSongs = [...prevSongs];
			const existingSong = prevSongs[index];

			updatedSongs[index] = {
				...existingSong,
				...song,
			};

			localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(updatedSongs));
			return updatedSongs;
		});
	}

	function onDeleteSong(index: number) {
		setSongs((prevSongs) => {
			const updatedSongs = prevSongs.filter((_, songIndex) => songIndex !== index);
			localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(updatedSongs));
			return updatedSongs;
		});
	}

	return { songs, loading, loadSongs, onCreateSong, onUpdateSong, onDeleteSong };
}

