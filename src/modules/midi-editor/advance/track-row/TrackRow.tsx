import { TableCell, TableRow } from "@mui/material";
import styles from "./TrackRow.module.scss";

type Props = {
	trackColumns: number[];
};

const TrackRow = ({ trackColumns }: Props) => {
	return (
		<TableRow>
			<TableCell></TableCell>

			{trackColumns.map((track, index) => (
				<TableCell
					key={track}
					className={`${styles.cell} ${
						index % 2 === 0 ? styles.oddCell : ""
					}`.trim()}
				>
					{track}
				</TableCell>
			))}
		</TableRow>
	);
};

export default TrackRow;
