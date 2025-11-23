import type { Note, Song } from "../types/song.types";
import { SongApi } from "./song.api";

export const NoteApi = {
	updateNotesInSong,
};

async function updateNotesInSong(songId: number, notes: Note[]): Promise<Song> {
	// just for mockup
	const songs = await SongApi.fetchSongs();
	const songIndex = songs.findIndex((s) => s.id === songId);

	if (songIndex === -1) {
		throw new Error(`Song with id ${songId} not found`);
	}

	const existingSong = songs[songIndex];
	const updatedSong: Song = {
		...existingSong,
		notes,
		updatedAt: new Date(),
	};

	const updatedSongs = [...songs];
	updatedSongs[songIndex] = updatedSong;

	await SongApi.updateSong(songId, updatedSong);

	return updatedSong;
}

