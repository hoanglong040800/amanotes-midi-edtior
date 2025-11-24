import type { CSSProperties } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TIME_RULER_WIDTH } from "../../../../constants/midi-editor.cons";
import styles from "./EditorContent.module.scss";
import TimeRow from "../time-row/TimeRow";
import type { CellNotesByTime } from "../../_types/midi-editor.types";

type Props = {
	timeline: number[];
	cellNotesByTime: CellNotesByTime;
};

const EditorContent = ({ timeline, cellNotesByTime }: Props) => {
	
	const tableStyle = { "--ruler-width": `${TIME_RULER_WIDTH}px` } as CSSProperties;

	return (
		<Box className={styles.wrapper}>
			<TableContainer className={styles.tableContainer} style={tableStyle}>
				<Table className={styles.table} size="small">
					<TableBody>
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
