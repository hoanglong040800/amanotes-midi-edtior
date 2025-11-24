import type { Note, Song } from "../types/song.types";
import type { CreateNoteInput, UpdateNoteInput } from "../dto/note.dto";
import { SongApi } from "./song.api";

export const NoteApi = {
	createNote,
	updateNote,
	deleteNote,
};

function generateNoteId(): number {
	return Date.now() + Math.floor(Math.random() * 1000);
}

async function getSongById(songId: string): Promise<Song> {
	const songs = await SongApi.fetchSongs();
	const song = songs.find((s) => s.id === songId);

	if (!song) {
		throw new Error(`Song with id ${songId} not found`);
	}

	return song;
}

async function updateSongNotes(song: Song, notes: Note[]): Promise<Song> {
	// TODO
}

function buildNewNote(input: CreateNoteInput): Note {
	const timestamp = new Date();

	return {
		id: generateNoteId(),
		track: input.track,
		time: input.time,
		title: input.title.trim(),
		description: input.description?.trim() ?? "",
		color: input.color,
		createdAt: timestamp,
		updatedAt: timestamp,
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

async function createNote(songId: string, input: CreateNoteInput): Promise<Song> {
	const song = await getSongById(songId);
	
	const isDuplicate = song.notes.some(
		(note) => note.time === input.time && note.track === input.track
	);

	if (isDuplicate) {
		throw new Error(`A note already exists at time ${input.time} on track ${input.track}`);
	}

	const newNote = buildNewNote(input);
	const updatedNotes = [...song.notes, newNote];

	return await updateSongNotes(songId, updatedNotes);
}

async function updateNote(
	songId: string,
	noteId: number,
	updates: UpdateNoteInput
): Promise<Song> {
	const song = await getSongById(songId);
	const noteIndex = song.notes.findIndex((note) => note.id === noteId);

	if (noteIndex === -1) {
		throw new Error(`Note with id ${noteId} not found`);
	}

	const updatedNote = buildUpdatedNote(song.notes[noteIndex], updates);
	const updatedNotes = [...song.notes];
	updatedNotes[noteIndex] = updatedNote;

	return await updateSongNotes(songId, updatedNotes);
}

async function deleteNote(songId: string, noteId: number): Promise<Song> {
	const song = await getSongById(songId);
	const updatedNotes = song.notes.filter((note) => note.id !== noteId);

	return await updateSongNotes(songId, updatedNotes);
}
