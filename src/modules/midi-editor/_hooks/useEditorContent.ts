import { TIME_MARKER_INTERVAL } from "../_const/midi-editor.cons";

type UseEditorContentParams = {
	duration: number;
};

type EditorContentRow = {
	id: string;
	marker: number;
	timeLabel: string;
	timelineLabel: string;
};

export function useEditorContent({ duration }: UseEditorContentParams) {
	const safeDuration = Math.max(0, Number.isFinite(duration) ? duration : 0);
	const markers = buildMarkers(safeDuration);

	const rows: EditorContentRow[] = markers.map((marker, index) => {
		return {
			id: `marker-${marker}-${index}`,
			marker,
			timeLabel: `${marker}s`,
			timelineLabel: `Timeline row ${index + 1}`,
		};
	});

	return {
		rows,
	};
}

function buildMarkers(duration: number) {
	if (duration < 0) {
		return [0];
	}

	const markers: number[] = [];

	for (let current = 0; current <= duration; current += TIME_MARKER_INTERVAL) {
		markers.push(Math.round(current));
	}

	if (markers.length === 0) {
		markers.push(0);
	}

	const lastMarker = markers[markers.length - 1];
	if (lastMarker < duration) {
		markers.push(Math.round(duration));
	}

	return markers;
}

