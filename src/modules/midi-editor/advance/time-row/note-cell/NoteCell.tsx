import TableCell from "@mui/material/TableCell";
import styles from "./NoteCell.module.scss";
import Typography from "@mui/material/Typography";
import type { Note } from "../../../../../backend/types";

type Props = {
	note?: Note;
};


const globalCellClass = "noteCell";

const NoteCell = ({ note }: Props) => {
	const cellClassName = `${styles.cell} ${globalCellClass}`;

	if (!note) {
		return <TableCell className={cellClassName} />;
	}

	return (
		<TableCell className={cellClassName} style={{ backgroundColor: note.color }}>
			<Typography variant="body2">{note.title}</Typography>
		</TableCell>
	);
};

export default NoteCell;
