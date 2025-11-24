import type { Note } from "../types/song.types";
import type { CreateNoteInput, UpdateNoteInput } from "../dto/note.dto";
import { StorageKey } from "../../enums/common.enum";
import { v4 as uuidv4 } from 'uuid';

const SAMPLE_NOTES_URL = "/src/backend/data/sample-notes.json";

export const NoteApi = {
	createNote,
	updateNote,
	deleteNote,
	fetchNotesBySongId
};

async function _saveNotesToLocalStorage(notes: Note[]) {
	localStorage.setItem(StorageKey.CACHED_NOTES, JSON.stringify(notes));
}

async function fetchAllNotesFromRemote(): Promise<Note[]> {
	const response = await fetch(SAMPLE_NOTES_URL);
	if (!response.ok) {
		throw new Error("Failed to load notes.");
	}

	const data = (await response.json()) as Note[];

	_saveNotesToLocalStorage(data);

	return data;
}

async function fetchNotesBySongId(songId: string): Promise<Note[]> {
	const allNotes = await fetchAllNotes();
	return allNotes.filter((note) => note.song.id === songId);
}

function fetchAllNotes() {
	const cachedNotes = localStorage.getItem(StorageKey.CACHED_NOTES);

	if (cachedNotes) {
		return JSON.parse(cachedNotes) as Note[];
	}

	return fetchAllNotesFromRemote();
}

function buildNewNote(input: CreateNoteInput): Note {
	const timestamp = new Date();

	return {
		id: uuidv4(),
		track: input.track,
		time: input.time,
		title: input.title.trim(),
		description: input.description?.trim() ?? "",
		color: input.color,
		createdAt: timestamp,
		updatedAt: timestamp,
		song: {
			id: input.songId,
		},
	};
}

function buildUpdatedNote(existingNote: Note, updates: UpdateNoteInput): Note {
	return {
		...existingNote,
		...updates,
		title: updates.title?.trim() ?? existingNote.title,
		description: updates.description?.trim() ?? existingNote.description ?? "",
		updatedAt: new Date(),
	};
}

async function createNote(input: CreateNoteInput): Promise<Note> {
	const allNotes = await fetchAllNotes();

	const isDuplicate = allNotes.some(
		(note) => note.time === input.time && note.track === input.track
	);

	if (isDuplicate) {
		throw new Error(`A note already exists at time ${input.time} on track ${input.track}`);
	}

	const newNote = buildNewNote(input);
	const updatedNotes = [...allNotes, newNote];

	await _saveNotesToLocalStorage(updatedNotes);

	return newNote;
}

async function updateNote(noteId: string, updates: UpdateNoteInput): Promise<Note> {
	const allNotes = await fetchAllNotes();
	const noteIndex = allNotes.findIndex((note) => note.id === noteId);

	if (noteIndex === -1) {
		throw new Error(`Note with id ${noteId} not found`);
	}

	const updatedNote = buildUpdatedNote(allNotes[noteIndex], updates);
	const updatedNotes = [...allNotes];
	updatedNotes[noteIndex] = updatedNote;

	await _saveNotesToLocalStorage(updatedNotes);

	return updatedNote;
}

async function deleteNote(noteId: string): Promise<void> {
	const allNotes = await fetchAllNotes();

	const updatedNotes = allNotes.filter((note) => note.id !== noteId);

	await _saveNotesToLocalStorage(updatedNotes);
}
