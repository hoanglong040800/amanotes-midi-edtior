import { useEffect, useState } from "react";
import type { Note, Song } from "../../../backend/types/song.types";
import type { CreateNoteInput, UpdateNoteInput } from "../../../backend/dto/note.dto";
import { NoteApi } from "../../../backend/api";
import type { CellNotesByTime } from "../_types/midi-editor.types";

type UseMidiEditorParams = {
	song: Song;
};

export function useMidiEditor({ song }: UseMidiEditorParams) {
	const [isNotePopupOpen, setNotePopupOpen] = useState(false);
	const [editingNote, setEditingNote] = useState<Note | null>(null);
	const [notes, setNotes] = useState<Note[]>([]);
	const [cellNotesByTime, setCellNotesByTime] = useState<CellNotesByTime>({});
	const timeline = getTimeline();

	//  ----- EFFECTS -----

	useEffect(() => {
		setNotes(song.notes);
		setCellNotesByTime(mapNotesToCellNotesByTime(song.notes));
	}, [song.id]);

	//  ----- FUNCTIONS -----

	function getTimeline() {
		const interval = 5;
		const duration = Math.max(0, song.totalDuration);

		if (duration === 0) {
			return [0];
		}

		const segments = Math.ceil(duration / interval);
		const timeline = Array.from({ length: segments + 1 }, (_, index) => {
			const point = index * interval;
			return point >= duration ? duration : point;
		});

		return timeline;
	}

	const maxDuration = song.totalDuration;

	function openNotePopup() {
		setEditingNote(null);
		setNotePopupOpen(true);
	}

	function openNotePopupForEdit(note: Note) {
		setEditingNote(note);
		setNotePopupOpen(true);
	}

	function closeNotePopup() {
		setNotePopupOpen(false);
		setEditingNote(null);
	}

	function mapNotesToCellNotesByTime(list: Note[]): CellNotesByTime {
		const result: CellNotesByTime = {};

		for (const note of list) {
			const { time, track } = note;

			result[time] = result[time] || {};
			result[time][track] = note;
		}

		return result;
	}

	async function onCreateNote(input: CreateNoteInput) {
		try {
			const updatedSong = await NoteApi.createNote(song.id, input);
			setNotes(updatedSong.notes);
		} catch (error) {
			console.error("Failed to create note:", error);
		}
	}

	async function onUpdateNote(noteId: number, updates: UpdateNoteInput) {
		try {
			const updatedSong = await NoteApi.updateNote(song.id, noteId, updates);
			setNotes(updatedSong.notes);
		} catch (error) {
			console.error("Failed to update note:", error);
		}
	}

	async function onDeleteNote(noteId: number) {
		try {
			const updatedSong = await NoteApi.deleteNote(song.id, noteId);
			setNotes(updatedSong.notes);
		} catch (error) {
			console.error("Failed to delete note:", error);
		}
	}

	return {
		timeline,
		cellNotesByTime,
		notes,
		maxDuration,
		isNotePopupOpen,
		editingNote,
		openNotePopup,
		openNotePopupForEdit,
		closeNotePopup,
		onCreateNote,
		onUpdateNote,
		onDeleteNote,
	};
}
