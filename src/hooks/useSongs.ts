import { useState } from "react";
import type { Song } from "../types/song.types";
import { StorageKey } from "../enums/common.enum";

const SAMPLE_SONGS_URL = "/src/data/sample-songs.json";

export type LoadSingleSongResult = {
	song: Song | null;
	error: string | null;
};

export function useSongs() {
	const [songs, setSongs] = useState<Song[]>([]);
	const [loading, setLoading] = useState(false);

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

	async function loadSong(songId?: string): Promise<LoadSingleSongResult> {
		if (songId === undefined) {
			return { song: null, error: "Missing song identifier." };
		}

		const index = Number(songId);

		if (Number.isNaN(index) || index < 0) {
			return { song: null, error: "Invalid song identifier." };
		}

		try {
			const allSongs = await getSongs();
			const song = allSongs[index] ?? null;
			return song ? { song, error: null } : { song: null, error: "Song not found." };
		} catch {
			return { song: null, error: "Unable to load song." };
		}
	}

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
			const nextId =
				song.id ??
				(prevSongs.length > 0
					? Math.max(...prevSongs.map((existingSong) => existingSong.id ?? 0)) + 1
					: 1);
			const songWithId: Song = { ...song, id: nextId };
			const updatedSongs = [...prevSongs, songWithId];
			localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(updatedSongs));
			return updatedSongs;
		});
	}

	function onUpdateSong(songId: number, song: Song) {
		setSongs((prevSongs) => {
			const index = prevSongs.findIndex((existingSong) => existingSong.id === songId);

			if (index === -1) {
				return prevSongs;
			}

			const updatedSongs = [...prevSongs];
			const existingSong = prevSongs[index];

			updatedSongs[index] = {
				...existingSong,
				...song,
				id: existingSong.id,
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

	return {
		songs,
		loading,
		loadSongs,
		loadSong,
		onCreateSong,
		onUpdateSong,
		onDeleteSong,
	};
}
