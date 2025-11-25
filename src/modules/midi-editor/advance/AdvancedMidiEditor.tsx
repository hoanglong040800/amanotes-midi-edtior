import { Box } from "@mui/material";
import EditorContent from "./content/EditorContent";
import styles from "./AdvancedMidiEditor.module.scss";
import { useMidiEditor } from "../_hooks/useMidiEditor";
import NoteActionPopup from "../../notes/action-popup/NoteActionPopup";
import type { GetSongWithNotes } from "../../../backend/dto/song.dto";
import { MidiEditorProvider } from "../_context/MidiEditorActionsContext";

type Props = {
	song: GetSongWithNotes;
};

const AdvancedMidiEditor = ({ song }: Props) => {
	const {
		timeline,
		cellNotesByTime,
		isNotePopupOpen,
		maxDuration,
		editingNote,
		actionMode,
		createPosition,
		closeNotePopup,
		onCreateNote,
		onUpdateNote,
		openNotePopupCreate,
		onDeleteNote,
		openNotePopupForEdit,
	} = useMidiEditor({ song });

	return (
		<MidiEditorProvider
			value={{
				openNotePopupCreate,
				openNotePopupForEdit,
			}}
		>
			<Box className={styles.container}>
				<Box className={styles.content}>
					<EditorContent timeline={timeline} cellNotesByTime={cellNotesByTime} />
				</Box>
			</Box>

			<NoteActionPopup
				songId={song.id}
				isOpen={isNotePopupOpen}
				maxDuration={maxDuration}
				mode={actionMode}
				editingNote={editingNote}
				createPosition={createPosition}
				onClose={closeNotePopup}
				onCreateNote={onCreateNote}
				onUpdateNote={onUpdateNote}
				onDeleteNote={onDeleteNote}
			/>
		</MidiEditorProvider>
	);
};

export default AdvancedMidiEditor;
