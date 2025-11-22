import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NoteList from "../../../notes/list/NoteList";
import SongInfo from "../../../songs/components/info/SongInfo";
import type { Song } from "../../../../types/song.types";

type Props = {
	song: Song | null;
	loading: boolean;
	error?: string | null;
};

const SimpleMidiEditor = ({ song, loading, error = null }: Props) => {
	if (loading) {
		return (
			<Stack spacing={2} alignItems="center" paddingY={4}>
				<CircularProgress />
				<Typography variant="body2" color="text.secondary">
					Loading song data...
				</Typography>
			</Stack>
		);
	}

	if (error) {
		return (
			<Typography variant="body1" color="error">
				{error}
			</Typography>
		);
	}

	if (!song) {
		return <Typography variant="body1">Song not found.</Typography>;
	}

	return (
		<Stack spacing={3}>
			<SongInfo song={song} />

			<Divider />

			<Stack spacing={1}>
				<Typography variant="subtitle1">Notes</Typography>
				<NoteList notes={song.notes} />
			</Stack>
		</Stack>
	);
};

export default SimpleMidiEditor;

