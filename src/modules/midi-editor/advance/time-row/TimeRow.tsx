import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import styles from "./TimeRow.module.scss";

type RowData = {
	timeLabel: string;
	rulerClassName: string;
	contentClassName: string;
};

type Props = {
	row: RowData;
	trackCount: number;
};
const TimeRow = ({ row, trackCount }: Props) => {
	const trackColumns = Array.from({ length: trackCount });

	return (
		<TableRow className={styles.row}>
			<TableCell className={row.rulerClassName}>
				<Typography variant="body2" color="text.secondary">
					{row.timeLabel}
				</Typography>
			</TableCell>
			{trackColumns.map((_, index) => (
				<TableCell key={`track-${index}`} className={row.contentClassName} />
			))}
		</TableRow>
	);
};

export default TimeRow;

