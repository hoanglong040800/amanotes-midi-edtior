import { useState } from "react";
import type { Song } from "../backend/types/song.types";
import { SongApi } from "../backend/api";

export function useSongs() {
	const [isLoading, setIsLoading] = useState(false);

	async function loadSingleSong(id: string): Promise<Song | null> {
		setIsLoading(true);

		if (!id) {
			return null;
		}

		try {
			const song = await SongApi.fetchSongById(id);
			return song;
		} catch {
			return null;
		} finally {
			setIsLoading(false);
		}
	}

	async function loadMultiSongs(): Promise<Song[]> {
		setIsLoading(true);

		try {
			const songs = await SongApi.fetchSongs();
			return songs;
		} catch {
			return [];
		} finally {
			setIsLoading(false);
		}
	}

	async function onCreateSong(song: Song): Promise<Song> {
		try {
			const newSong = await SongApi.createSong(song);
			return newSong;
		} catch (error) {
			console.error("Failed to create song:", error);
			throw error;
		}
	}

	async function onUpdateSong(songId: string, song: Song): Promise<Song> {
		try {
			const updatedSong = await SongApi.updateSong(songId, song);
			return updatedSong;
		} catch (error) {
			console.error("Failed to update song:", error);
			throw error;
		}
	}

	async function onDeleteSong(songId: string): Promise<void> {
		try {
			await SongApi.deleteSong(songId);
		} catch (error) {
			console.error("Failed to delete song:", error);
			throw error;
		}
	}

	return {
		isLoading,
		loadMultiSongs,
		loadSingleSong,
		onCreateSong,
		onUpdateSong,
		onDeleteSong,
	};
}
