import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import NoteList from "../../notes/list/NoteList";
import NoteActionPopup from "../../notes/action-popup/NoteActionPopup";
import type { Song } from "../../../backend/types/song.types";
import { useMidiEditor } from "../_hooks/useMidiEditor";

type Props = {
	song: Song;
};

const SimpleMidiEditor = ({ song }: Props) => {
	const {
		notes,
		maxDuration,
		isNotePopupOpen,
		editingNote,
		openNotePopup,
		openNotePopupForEdit,
		closeNotePopup,
		onCreateNote,
		onUpdateNote,
		onDeleteNote,
	} = useMidiEditor({
		song,
	});

	function handleEdit(noteId: number) {
		const note = notes.find((n) => n.id === noteId);
		if (note) {
			openNotePopupForEdit(note);
		}
	}

	return (
		<Stack spacing={3}>
			<Stack direction="row" justifyContent="flex-end">
				<Button variant="contained" onClick={openNotePopup}>
					Create note
				</Button>
			</Stack>

			<Stack spacing={1}>
				<NoteList notes={notes} songId={song.id} onEdit={handleEdit} onDelete={onDeleteNote} />
			</Stack>

			<NoteActionPopup
				isOpen={isNotePopupOpen}
				maxDuration={maxDuration}
				mode={editingNote ? "edit" : "create"}
				editingNote={editingNote}
				onClose={closeNotePopup}
				onCreateNote={onCreateNote}
				onUpdateNote={onUpdateNote}
			/>
		</Stack>
	);
};

export default SimpleMidiEditor;
