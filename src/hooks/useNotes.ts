import { useEffect, useState } from "react";
import type { Note, Song } from "../backend/types/song.types";
import type { CreateNoteInput, UpdateNoteInput } from "../backend/dto/songs.dto";
import { generateNoteId, formatNotesData } from "../modules/notes/_utils/note.utils";
import { useSongs } from "./useSongs";

type UseNotesParams = {
	initialNotes?: Note[];
	song: Song | null;
};

const DEFAULT_NOTES: Note[] = [];

export function useNotes({ initialNotes = DEFAULT_NOTES, song }: UseNotesParams) {
	const [notes, setNotes] = useState<Note[]>(() => formatNotesData(initialNotes));
	const { onUpdateSong } = useSongs();

	useEffect(() => {
		setNotes(formatNotesData(initialNotes));
	}, [initialNotes]);

	function saveNotesToSong(nextNotes: Note[]) {
		if (!song) {
			return;
		}

		const updatedSong: Song = {
			...song,
			notes: nextNotes,
			updatedAt: new Date(),
		};

		onUpdateSong(updatedSong.id, updatedSong);
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
		setNotes(nextNotes);
		saveNotesToSong(nextNotes);
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
		setNotes(nextNotes);
		saveNotesToSong(nextNotes);
	}

	function deleteNote(noteId: number) {
		const nextNotes = notes.filter((note) => note.id !== noteId);
		setNotes(nextNotes);
		saveNotesToSong(nextNotes);
	}

	return {
		notes,
		createNote,
		updateNote,
		deleteNote,
	};
}
