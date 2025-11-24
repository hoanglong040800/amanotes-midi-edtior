import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styles from "./TimeRow.module.scss";
import type { CellNotes } from "../../_types/midi-editor.types";
import { TRACK_COUNT } from "../../_const/midi-editor.cons";
import NoteCell from "./note-cell/NoteCell";

type Props = {
	timeMarker: number;
	cellNotes?: CellNotes;
};

const TimeRow = ({ timeMarker, cellNotes }: Props) => {
	const trackColumns = Array.from({ length: TRACK_COUNT }, (_, i) => i + 1);

	return (
		<TableRow className={styles.row}>
			<TableCell className={styles.rulerCell}>
				<Typography variant="body2" color="text.secondary">
					{timeMarker}s
				</Typography>
			</TableCell>

			{trackColumns.map((track) => (
				<NoteCell key={track} note={cellNotes?.[track]} />
			))}
		</TableRow>
	);
};

export default TimeRow;
