import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Song } from "../backend/types/song.types";
import { StorageKey } from "../enums/common.enum";

const SAMPLE_SONGS_URL = "/src/data/sample-songs.json";

export function useSongs() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

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

	function getSongsFromStorage(): Song[] {
		const cached = localStorage.getItem(StorageKey.CACHED_SONGS);
		return cached ? (JSON.parse(cached) as Song[]) : [];
	}

	function saveSongsToStorage(songs: Song[]): void {
		localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(songs));
	}

	async function loadSingleSong(index: number): Promise<Song | null> {
		setIsLoading(true);

		if (index === undefined) {
			return null;
		}

		try {
			if (Number.isNaN(index) || index < 0) {
				return null;
			}

			const allSongs = await getSongs();
			return allSongs[index] ?? null;
		} catch {
			return null;
		} finally {
			setIsLoading(false);
		}
	}

	async function loadMultiSongs(): Promise<Song[]> {
		setIsLoading(true);

		try {
			const data = await getSongs();
			return data;
		} catch {
			return [];
		} finally {
			setIsLoading(false);
		}
	}

	function generateSongId(): number {
		return Date.now() + Math.floor(Math.random() * 1000);
	}

	function onCreateSong(song: Song): Song[] {
		const currentSongs = getSongsFromStorage();
		const songId = song.id ?? generateSongId();
		const songWithId: Song = { ...song, id: songId };
		const updatedSongs = [...currentSongs, songWithId];

		saveSongsToStorage(updatedSongs);
		return updatedSongs;
	}

	function onUpdateSong(songId: number, song: Song): Song[] {
		const currentSongs = getSongsFromStorage();
		const songIndex = currentSongs.findIndex((existingSong) => existingSong.id === songId);

		const isSongNotFound = songIndex === -1;
		if (isSongNotFound) {
			return currentSongs;
		}

		const existingSong = currentSongs[songIndex];
		const updatedSong = {
			...existingSong,
			...song,
			id: existingSong.id,
		};

		const updatedSongs = [...currentSongs];
		updatedSongs[songIndex] = updatedSong;

		saveSongsToStorage(updatedSongs);
		return updatedSongs;
	}

	function onDeleteSong(songId: number): Song[] {
		const currentSongs = getSongsFromStorage();
		const updatedSongs = currentSongs.filter((song) => song.id !== songId);

		saveSongsToStorage(updatedSongs);
		return updatedSongs;
	}

	function onOpenEditor(index: number) {
		navigate(`/songs/${index}/editor`);
	}

	return {
		isLoading,
		loadMultiSongs,
		loadSingleSong,
		onCreateSong,
		onUpdateSong,
		onDeleteSong,
		onOpenEditor,
	};
}
