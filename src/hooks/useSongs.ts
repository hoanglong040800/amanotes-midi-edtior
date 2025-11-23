import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Song } from "../backend/types/song.types";
import { SongApi } from "../backend/api";

export function useSongs() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function loadSingleSong(id: number): Promise<Song | null> {
		setIsLoading(true);

		if (id === undefined) {
			return null;
		}

		try {
			if (Number.isNaN(id) || id < 0) {
				return null;
			}

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

	async function onUpdateSong(songId: number, song: Song): Promise<Song> {
		try {
			const updatedSong = await SongApi.updateSong(songId, song);
			return updatedSong;
		} catch (error) {
			console.error("Failed to update song:", error);
			throw error;
		}
	}

	async function onDeleteSong(songId: number): Promise<void> {
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
