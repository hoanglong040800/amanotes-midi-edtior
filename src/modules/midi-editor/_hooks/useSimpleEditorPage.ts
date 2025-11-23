import { useState } from "react";
import type { Note, Song } from "../../../api/types/song.types";
import type { CreateNoteInput } from "../../../api/dto/songs.dto";
import { useNotes } from "../../../hooks/useNotes";

type UseSimpleEditorPageParams = {
	song: Song | null;
	onSongUpdate: (updatedSong: Song) => void;
};

export function useSimpleEditorPage({ song, onSongUpdate }: UseSimpleEditorPageParams) {
	const [isNotePopupOpen, setNotePopupOpen] = useState(false);

	const { notes, createNote } = useNotes({
		initialNotes: song?.notes ?? [],
		sourceSong: song ?? null,
		persistToLocalStorage: Boolean(song),
		onNotesChange: (nextNotes: Note[]) => {
			if (!song) {
				return;
			}

			const timestamp = new Date();
			const updatedSong: Song = {
				...song,
				notes: nextNotes,
				updatedAt: timestamp,
			};

			onSongUpdate(updatedSong);
			return updatedSong;
		},
	});

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
	};
}


