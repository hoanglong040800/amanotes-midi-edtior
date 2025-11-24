import { useEffect, useState } from "react";
import type { Note } from "../../../backend/types/song.types";
import type { CreateNoteInput, UpdateNoteInput } from "../../../backend/dto/note.dto";
import { NoteApi } from "../../../backend/api";
import type { CellNotesByTime } from "../../../types/midi-editor.types";
import type { GetSongWithNotes } from "../../../backend/dto/song.dto";
import type { CreateNotePopupType } from "../../../types/midi-editor.types";

type UseMidiEditorParams = {
	song: GetSongWithNotes;
};

export function useMidiEditor({ song }: UseMidiEditorParams) {
	const [isNotePopupOpen, setNotePopupOpen] = useState(false);
	const [actionMode, setActionMode] = useState<"create" | "edit">("create");
	const [editingNote, setEditingNote] = useState<Note | null>(null);
	const [createPosition, setCreatePosition] = useState<CreateNotePopupType | null>(null);
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

	function openNotePopupCreate(params: CreateNotePopupType) {
		setActionMode("create");
		setEditingNote(null);
		setNotePopupOpen(true);
		setCreatePosition(params);
	}

	function openNotePopupForEdit(note: Note) {
		setActionMode("edit");
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
			const newNote = await NoteApi.createNote(input);
			setNotes([...notes, newNote]);
			setCellNotesByTime(mapNotesToCellNotesByTime([...notes, newNote]));
		} catch (error) {
			console.error("Failed to create note:", error);
		}
	}

	async function onUpdateNote(noteId: string, updates: UpdateNoteInput) {
		try {
			const updatedNote = await NoteApi.updateNote(noteId, updates);
			const updatedNotes = notes.map((note) => (note.id === noteId ? updatedNote : note));
			setNotes(updatedNotes);
			setCellNotesByTime(mapNotesToCellNotesByTime(updatedNotes));
		} catch (error) {
			console.error("Failed to update note:", error);
		}
	}

	async function onDeleteNote(noteId: string) {
		try {
			await NoteApi.deleteNote(noteId);
			const updatedNotes = notes.filter((note) => note.id !== noteId);
			setNotes(updatedNotes);
			setCellNotesByTime(mapNotesToCellNotesByTime(updatedNotes));
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
		actionMode,
		createPosition,
		openNotePopupCreate,
		openNotePopupForEdit,
		closeNotePopup,
		onCreateNote,
		onUpdateNote,
		onDeleteNote,
	};
}
