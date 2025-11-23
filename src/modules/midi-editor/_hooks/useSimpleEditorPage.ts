import { useEffect, useState } from "react";
import type { Song } from "../../../backend/types/song.types";
import type { CreateNoteInput } from "../../../backend/dto/songs.dto";
import { useNotes } from "../../../hooks/useNotes";

type UseSimpleEditorPageParams = {
	song: Song | null;
	onSongUpdate: (updatedSong: Song) => void;
};

export function useSimpleEditorPage({ song, onSongUpdate }: UseSimpleEditorPageParams) {
	const [isNotePopupOpen, setNotePopupOpen] = useState(false);

	const { notes, createNote } = useNotes({
		initialNotes: song?.notes ?? [],
		song,
	});

	useEffect(() => {
		if (!song) {
			return;
		}

		const updatedSong: Song = {
			...song,
			notes,
			updatedAt: new Date(),
		};

		onSongUpdate(updatedSong);
	}, [notes]);

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
