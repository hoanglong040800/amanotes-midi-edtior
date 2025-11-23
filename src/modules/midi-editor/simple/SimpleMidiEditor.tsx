import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NoteList from "../../notes/list/NoteList";
import NoteActionPopup from "../../notes/action-popup/NoteActionPopup";
import type { Song } from "../../../api/types/song.types";
import { useSimpleEditorPage } from "../_hooks/useSimpleEditorPage";

type Props = {
	song: Song | null;
	loading: boolean;
	error?: string | null;
	onSongUpdate: (updatedSong: Song) => void;
};

const SimpleMidiEditor = ({ song, loading, error = null, onSongUpdate }: Props) => {
	const { notes, maxDuration, isNotePopupOpen, openNotePopup, closeNotePopup, handleCreateNote } =
		useSimpleEditorPage({
			song,
			onSongUpdate,
		});

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
			<Stack direction="row" justifyContent="flex-end">
				<Button variant="contained" onClick={openNotePopup}>
					Create note
				</Button>
			</Stack>

			<Stack spacing={1}>
				<NoteList notes={notes} />
			</Stack>

			<NoteActionPopup
				isOpen={isNotePopupOpen}
				maxDuration={maxDuration}
				onClose={closeNotePopup}
				onCreateNote={handleCreateNote}
			/>
		</Stack>
	);
};

export default SimpleMidiEditor;
