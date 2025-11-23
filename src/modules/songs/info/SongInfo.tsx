import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Song } from "../../../backend/types/song.types";
import SongMetadata from "../metadata/SongMetadata";

type Props = {
	song: Song;
};

const SongInfo = ({ song }: Props) => (
	<Stack spacing={3}>
		<Typography variant="body2" color="text.secondary">
			{song.description || "No description provided."}
		</Typography>

		<SongMetadata song={song} />
	</Stack>
);

export default SongInfo;

