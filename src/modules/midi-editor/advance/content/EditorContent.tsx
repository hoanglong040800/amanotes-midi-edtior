import type { CSSProperties } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TIME_RULER_WIDTH, TRACK_COUNT } from "../../../../constants/midi-editor.cons";
import styles from "./EditorContent.module.scss";
import TimeRow from "../time-row/TimeRow";
import type { CellNotesByTime } from "../../../../types/midi-editor.types";
import TrackRow from "../track-row/TrackRow";

type Props = {
	timeline: number[];
	cellNotesByTime: CellNotesByTime;
};

const EditorContent = ({ timeline, cellNotesByTime }: Props) => {
	const tableStyle = { "--ruler-width": `${TIME_RULER_WIDTH}px` } as CSSProperties;
	const trackColumns = Array.from({ length: TRACK_COUNT }, (_, i) => i + 1);

	return (
		<Box className={styles.wrapper}>
			<TableContainer className={styles.tableContainer} style={tableStyle}>
				<Table className={styles.table} size="small">
					<TableBody>
						<TrackRow trackColumns={trackColumns} />

						{timeline.map((timeMarker) => (
							<TimeRow
								key={timeMarker}
								timeMarker={timeMarker}
								cellNotes={cellNotesByTime[timeMarker]}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default EditorContent;
