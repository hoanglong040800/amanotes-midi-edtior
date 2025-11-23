import type { Note } from "../backend/types/song.types";
import { NoteApi } from "../backend/api";

export async function saveNotesToSong(songId: string, notes: Note[]) {
	try {
		await NoteApi.updateNotesInSong(songId, notes);
	} catch (error) {
		console.error("Failed to save notes to song:", error);
		throw error;
	}
}
