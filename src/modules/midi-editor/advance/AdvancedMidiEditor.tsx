import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Song } from "../../../types/song.types";

type Props = {
	song: Song | null;
	loading: boolean;
	error?: string | null;
};

const AdvancedMidiEditor = ({ song, loading, error = null }: Props) => {
	if (loading) {
		return (
			<Stack spacing={2} alignItems="center" paddingY={4}>
				<CircularProgress />
				<Typography variant="body2" color="text.secondary">
					Preparing advanced tools...
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
			<Typography variant="subtitle1">Advanced Editor</Typography>
			<Typography variant="body2" color="text.secondary">
				Advanced MIDI editing capabilities will appear here.
			</Typography>
		</Stack>
	);
};

export default AdvancedMidiEditor;
