import "./SongMetadata.scss";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Song } from "../../../../types/song.types";

export type Props = {
	song: Song;
};

const SongMetadata = ({ song }: Props) => (
	<Stack direction="row" spacing={3} className="metadata">
		<Typography variant="caption">Duration: {song.totalDuration}s</Typography>
		<Typography variant="caption">
			Track Labels: {song.trackLabels.slice(0, 3).join(", ")}
			{song.trackLabels.length > 3 ? ", ..." : ""}
		</Typography>
		<Typography variant="caption">Notes: {song.notes.length}</Typography>
	</Stack>
);

export default SongMetadata;
