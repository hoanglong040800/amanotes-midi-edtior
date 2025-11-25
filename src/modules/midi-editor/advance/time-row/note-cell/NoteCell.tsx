import TableCell from "@mui/material/TableCell";
import styles from "./NoteCell.module.scss";
import type { Note } from "../../../../../backend/types";
import { useMidiEditorActions } from "../../../_context/MidiEditorActionsContext";
import { Box } from "@mui/material";

type Props = {
	note?: Note;
	time: number; // row
	track: number; // column
};

const globalCellClass = "noteCell";

const NoteCell = ({ note, time, track }: Props) => {
	const { openNotePopupCreate, openNotePopupForEdit } = useMidiEditorActions();
	const cellClassName = `${styles.cell} ${globalCellClass}`;

	const handleClick = () => {
		if (note) {
			openNotePopupForEdit(note);
			return;
		}

		openNotePopupCreate({ track, time });
	};

	if (!note) {
		return <TableCell className={cellClassName} onClick={handleClick} />;
	}

	return (
		<TableCell className={cellClassName} onClick={handleClick}>
			<Box style={{ backgroundColor: note.color }} className={styles.dot}></Box>
		</TableCell>
	);
};

export default NoteCell;
