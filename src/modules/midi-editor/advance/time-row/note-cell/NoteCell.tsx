import TableCell from "@mui/material/TableCell";
import styles from "./NoteCell.module.scss";
import Typography from "@mui/material/Typography";
import type { Note } from "../../../../../backend/types";
import { useMidiEditorActions } from "../../../_context/MidiEditorActionsContext";

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
		<TableCell
			className={cellClassName}
			onClick={handleClick}
			style={{ backgroundColor: note.color }}
		>
			<Typography variant="body2">{note.title}</Typography>
		</TableCell>
	);
};

export default NoteCell;
