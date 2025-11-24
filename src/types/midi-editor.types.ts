import type { Note } from "../backend/types";

export type MidiEditorActionsContextValue = {
	openNotePopupCreate: (params: CreateNotePopupType) => void;
	openNotePopupForEdit: (note: Note) => void;
};

/** @comment key is track index (1-8) */
export type CellNotes = Record<number, Note>;

/** @comment key is time marker */
export type CellNotesByTime = Record<number, CellNotes>;

export type CreateNotePopupType = Pick<Note, "track" | "time">;
