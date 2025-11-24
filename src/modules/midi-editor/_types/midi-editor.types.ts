import type { Note } from "../../../backend/types";

/** @comment key is track index (1-8) */
export type CellNotes = Record<number, Note>;

/** @comment key is time marker */
export type CellNotesByTime = Record<number, CellNotes>;
