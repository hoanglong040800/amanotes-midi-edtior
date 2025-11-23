import { useEffect, useState } from "react";
import type { Note, Song } from "../../../backend/types/song.types";
import type { CreateNoteInput, UpdateNoteInput } from "../../../backend/dto/songs.dto";
import { saveNotesToSong } from "../../../hooks/useNotes";
import { generateNoteId, formatNotesData } from "../../notes/_utils/note.utils";

type UseSimpleEditorPageParams = {
	song: Song | null;
};

export function useSimpleEditorPage({ song }: UseSimpleEditorPageParams) {
	const [isNotePopupOpen, setNotePopupOpen] = useState(false);
	const [notes, setNotes] = useState<Note[]>(() => formatNotesData(song?.notes ?? []));

	useEffect(() => {
		setNotes(formatNotesData(song?.notes ?? []));
	}, [song?.notes]);

	const maxDuration = song?.totalDuration ?? 0;

	async function saveSongNotes(nextNotes: Note[]) {
		if (!song) {
			return;
		}

		try {
			await saveNotesToSong(song.id, nextNotes);
		} catch (error) {
			console.error("Failed to save notes:", error);
		}
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
		saveSongNotes(nextNotes);
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
		saveSongNotes(nextNotes);
	}

	function deleteNote(noteId: number) {
		const nextNotes = notes.filter((note) => note.id !== noteId);
		setNotes(nextNotes);
		saveSongNotes(nextNotes);
	}

	function openNotePopup() {
		if (!song) {
			return;
		}

		setNotePopupOpen(true);
	}

	function closeNotePopup() {
		setNotePopupOpen(false);
	}

	function handleCreateNote(input: CreateNoteInput) {
		if (!song) {
			return;
		}

		createNote({
			...input,
			time: Math.min(input.time, maxDuration),
		});
	}

	return {
		notes,
		maxDuration,
		isNotePopupOpen,
		openNotePopup,
		closeNotePopup,
		handleCreateNote,
		createNote,
		updateNote,
		deleteNote,
	};
}
