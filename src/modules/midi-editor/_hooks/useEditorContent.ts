import { useState } from "react";
import type { Note, Song } from "../../../backend/types";
import type { CellNotesByTime } from "../_types/midi-editor.types";

type Props = {
	song: Song;
};

export const useEditorContent = ({ song }: Props) => {
	const timeline = getTimeline();

	const [cellNotesByTime, setCellNotesByTime] = useState<CellNotesByTime>(
		initCellNotesByTime(song.notes)
	);

	function initCellNotesByTime(notes: Note[]) {
		let result: CellNotesByTime = {};

		for (const note of notes) {
			const { time, track } = note;

			result[time] = result[time] || {};
			result[time][track] = note;
		}

		return result;
	}

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

	return {
		timeline,
		cellNotesByTime,
	};
};
