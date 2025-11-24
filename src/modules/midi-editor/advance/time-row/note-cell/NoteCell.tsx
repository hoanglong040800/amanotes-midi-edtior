import TableCell from "@mui/material/TableCell";
import styles from "./NoteCell.module.scss";

type Props = {
	className: string;
};

const NoteCell = ({ className }: Props) => {
	const cellClassName = [className, styles.cell].filter(Boolean).join(" ");

	return <TableCell className={cellClassName} />;
};

export default NoteCell;
