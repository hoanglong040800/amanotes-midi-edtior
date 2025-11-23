import { TIME_MARKER_INTERVAL } from "../_const/midi-editor.cons";

type EditorContentStyles = Record<string, string>;

type UseEditorContentParams = {
	duration: number;
	styles: EditorContentStyles;
};

type EditorContentRow = {
	id: string;
	marker: number;
	timeLabel: string;
	timelineLabel: string;
	rulerClassName: string;
	contentClassName: string;
};

export function useEditorContent({ duration, styles }: UseEditorContentParams) {
	const safeDuration = Math.max(0, Number.isFinite(duration) ? duration : 0);
	const markers = buildMarkers(safeDuration);
	const lastIndex = markers.length - 1;

	const rows: EditorContentRow[] = markers.map((marker, index) => {
		const { rulerClassName, contentClassName } = buildRowClassNames({
			index,
			lastIndex,
			styles,
		});

		return {
			id: `marker-${marker}-${index}`,
			marker,
			timeLabel: `${marker}s`,
			timelineLabel: `Timeline row ${index + 1}`,
			rulerClassName,
			contentClassName,
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

type BuildRowClassNamesParams = {
	index: number;
	lastIndex: number;
	styles: EditorContentStyles;
};

function buildRowClassNames({ index, lastIndex, styles }: BuildRowClassNamesParams) {
	const isLastRow = index === lastIndex;
	const isEvenRow = index % 2 === 0;

	const rulerClassName = [
		styles.rulerCell ?? "",
		isEvenRow ? "" : styles.rulerCellAlt ?? "",
		isLastRow ? styles.rulerCellLast ?? "" : "",
	]
		.filter(Boolean)
		.join(" ");

	const contentClassName = [
		styles.contentCell ?? "",
		isEvenRow ? "" : styles.contentCellAlt ?? "",
		isLastRow ? styles.contentCellLast ?? "" : "",
	]
		.filter(Boolean)
		.join(" ");

	return {
		rulerClassName,
		contentClassName,
	};
}

