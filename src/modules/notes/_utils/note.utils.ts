import type { Note } from "../../../api/types/song.types";

export function generateNoteId() {
	return Date.now() + Math.floor(Math.random() * 1000);
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

