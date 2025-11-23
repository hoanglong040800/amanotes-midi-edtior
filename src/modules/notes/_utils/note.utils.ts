import type { Note } from "../../../backend/types/song.types";

export function generateNoteId() {
	const id = Date.now() + Math.floor(Math.random() * 1000);
	return id.toString();
}

export function normalizeNote(note: Note) {
	const timestamp = new Date();

	return {
		...note,
		id: note.id ?? generateNoteId(),
		createdAt: note.createdAt ?? timestamp,
		updatedAt: note.updatedAt ?? timestamp,
		description: note.description ?? "",
	};
}

export function formatNotesData(notes: Note[]) {
	return notes.map((note) => normalizeNote(note));
}

