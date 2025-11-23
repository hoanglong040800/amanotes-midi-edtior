import { useEffect, useState } from "react";
import type { Note, Song } from "../../../backend/types/song.types";
import type { CreateNoteInput, UpdateNoteInput } from "../../../backend/dto/note.dto";
import { NoteApi } from "../../../backend/api";

type UseMidiEditorParams = {
	song: Song | null;
};

export function useMidiEditor({ song }: UseMidiEditorParams) {
	const [isNotePopupOpen, setNotePopupOpen] = useState(false);
	const [notes, setNotes] = useState<Note[]>(() => song?.notes ?? []);

	useEffect(() => {
		setNotes(song?.notes ?? []);
	}, [song?.notes]);

	const maxDuration = song?.totalDuration ?? 0;

	function openNotePopup() {
		if (!song) {
			return;
		}

		setNotePopupOpen(true);
	}

	function closeNotePopup() {
		setNotePopupOpen(false);
	}

	async function onCreateNote(input: CreateNoteInput) {
		if (!song) {
			return;
		}

		try {
			const updatedSong = await NoteApi.createNote(song.id, input);
			setNotes(updatedSong.notes);
		} catch (error) {
			console.error("Failed to create note:", error);
		}
	}

	async function onUpdateNote(noteId: number, updates: UpdateNoteInput) {
		if (!song) {
			return;
		}

		try {
			const updatedSong = await NoteApi.updateNote(song.id, noteId, updates);
			setNotes(updatedSong.notes);
		} catch (error) {
			console.error("Failed to update note:", error);
		}
	}

	async function onDeleteNote(noteId: number) {
		if (!song) {
			return;
		}

		try {
			const updatedSong = await NoteApi.deleteNote(song.id, noteId);
			setNotes(updatedSong.notes);
		} catch (error) {
			console.error("Failed to delete note:", error);
		}
	}

	return {
		notes,
		maxDuration,
		isNotePopupOpen,
		openNotePopup,
		closeNotePopup,
		onCreateNote,
		onUpdateNote,
		onDeleteNote,
	};
}
