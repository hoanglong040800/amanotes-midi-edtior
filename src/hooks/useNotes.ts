import { useEffect, useRef, useState } from "react";
import type { Note, Song } from "../api/types/song.types";
import type { CreateNoteInput, UpdateNoteInput } from "../api/dto/songs.dto";
import { generateNoteId, formatNotesData } from "../modules/notes/_utils/note.utils";
import { useSongs } from "./useSongs";

type UseNotesParams = {
	initialNotes?: Note[];
	onNotesChange?: (notes: Note[]) => Song | void;
	sourceSong?: Song | null;
	persistToLocalStorage?: boolean;
};

const DEFAULT_NOTES: Note[] = [];

export function useNotes({
	initialNotes = DEFAULT_NOTES,
	onNotesChange,
	sourceSong = null,
	persistToLocalStorage = false,
}: UseNotesParams = {}) {
	const [notes, setNotes] = useState<Note[]>(() => formatNotesData(initialNotes));
	const songRef = useRef<Song | null>(sourceSong);
	const { saveNoteToLocalStorage } = useSongs();

	useEffect(() => {
		songRef.current = sourceSong;
	}, [sourceSong]);

	useEffect(() => {
		setNotes(formatNotesData(initialNotes));
	}, [initialNotes]);

	function onChangeNotes(nextNotes: Note[]) {
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
				saveNoteToLocalStorage(updatedSong);
			}
		}
	}

	function loadNotes(nextNotes: Note[]) {
		onChangeNotes(formatNotesData(nextNotes));
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
		onChangeNotes(nextNotes);
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
		onChangeNotes(nextNotes);
	}

	function deleteNote(noteId: number) {
		const nextNotes = notes.filter((note) => note.id !== noteId);
		onChangeNotes(nextNotes);
	}

	return {
		notes,
		loadNotes,
		createNote,
		updateNote,
		deleteNote,
	};
}
