import { TableCell, TableRow } from "@mui/material";

type Props = {
	trackColumns: number[];
};

const TrackRow = ({ trackColumns }: Props) => {
	return (
		<TableRow>
			<TableCell></TableCell>

			{trackColumns.map((track) => (
				<TableCell key={track}>{track}</TableCell>
			))}
		</TableRow>
	);
};

export default TrackRow;
