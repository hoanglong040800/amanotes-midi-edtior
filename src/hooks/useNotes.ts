import { useEffect, useRef, useState } from "react";
import type { Note, Song } from "../types/song.types";
import { StorageKey } from "../enums/common.enum";

type UseNotesParams = {
	initialNotes?: Note[];
	onNotesChange?: (notes: Note[]) => Song | void;
	sourceSong?: Song | null;
	persistToLocalStorage?: boolean;
};

export type CreateNoteInput = {
	track: number;
	time: number;
	title: string;
	description?: string;
	color: string;
};

export type UpdateNoteInput = {
	track?: number;
	time?: number;
	title?: string;
	description?: string;
	color?: string;
};

const DEFAULT_NOTES: Note[] = [];

function generateNoteId() {
	return Date.now() + Math.floor(Math.random() * 1000);
}

function normalizeNote(note: Note) {
	const timestamp = new Date();

	return {
		...note,
		id: note.id ?? generateNoteId(),
		createdAt: note.createdAt ?? timestamp,
		updatedAt: note.updatedAt ?? timestamp,
		description: note.description ?? "",
	};
}

function normalizeNotes(notes: Note[]) {
	return notes.map((note) => normalizeNote(note));
}

export function useNotes({
	initialNotes = DEFAULT_NOTES,
	onNotesChange,
	sourceSong = null,
	persistToLocalStorage = false,
}: UseNotesParams = {}) {
	const [notes, setNotes] = useState<Note[]>(() => normalizeNotes(initialNotes));
	const songRef = useRef<Song | null>(sourceSong);

	useEffect(() => {
		songRef.current = sourceSong;
	}, [sourceSong]);

	useEffect(() => {
		setNotes(normalizeNotes(initialNotes));
	}, [initialNotes]);

	function emitChange(nextNotes: Note[]) {
		setNotes(nextNotes);

		let updatedSong: Song | null = null;

		if (onNotesChange) {
			const result = onNotesChange(nextNotes);
			if (result) {
				updatedSong = result;
			}
		}

		if (!updatedSong && songRef.current) {
			updatedSong = {
				...songRef.current,
				notes: nextNotes,
				updatedAt: new Date(),
			};
		}

		if (updatedSong) {
			songRef.current = updatedSong;

			if (persistToLocalStorage) {
				persistSong(updatedSong);
			}
		}
	}

	function loadNotes(nextNotes: Note[]) {
		emitChange(normalizeNotes(nextNotes));
	}

	function createNote(input: CreateNoteInput) {
		const timestamp = new Date();

		const newNote: Note = {
			id: generateNoteId(),
			track: input.track,
			time: input.time,
			title: input.title.trim(),
			description: input.description?.trim() ?? "",
			color: input.color,
			createdAt: timestamp,
			updatedAt: timestamp,
		};

		const nextNotes = [...notes, newNote];
		emitChange(nextNotes);
		return newNote;
	}

	function updateNote(noteId: number, updates: UpdateNoteInput) {
		const index = notes.findIndex((note) => note.id === noteId);

		if (index === -1) {
			return;
		}

		const timestamp = new Date();
		const updatedNote: Note = {
			...notes[index],
			...updates,
			title: updates.title?.trim() ?? notes[index].title,
			description: updates.description?.trim() ?? notes[index].description ?? "",
			updatedAt: timestamp,
		};

		const nextNotes = [...notes];
		nextNotes[index] = updatedNote;
		emitChange(nextNotes);
	}

	function deleteNote(noteId: number) {
		const nextNotes = notes.filter((note) => note.id !== noteId);
		emitChange(nextNotes);
	}

	return {
		notes,
		loadNotes,
		createNote,
		updateNote,
		deleteNote,
	};
}

function persistSong(song: Song) {
	try {
		const cachedSongsRaw = localStorage.getItem(StorageKey.CACHED_SONGS);
		const cachedSongs = cachedSongsRaw ? (JSON.parse(cachedSongsRaw) as Song[]) : [];
		const index = cachedSongs.findIndex((existingSong) => existingSong.id === song.id);

		if (index === -1) {
			cachedSongs.push(song);
		} else {
			cachedSongs[index] = song;
		}

		localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(cachedSongs));
	} catch {
		// ignore storage errors
	}
}


