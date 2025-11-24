import type { Song } from "../../../backend/types/song.types";
import { Box, IconButton } from "@mui/material";
import Add from "@mui/icons-material/Add";
import TrackHeader from "./track-header/TrackHeader";
import EditorContent from "./content/EditorContent";
import styles from "./AdvancedMidiEditor.module.scss";
import { useMidiEditor } from "../_hooks/useMidiEditor";
import NoteActionPopup from "../../notes/action-popup/NoteActionPopup";
import { TIME_RULER_WIDTH } from "../_const/midi-editor.cons";

type Props = {
	song: Song;
};

const AdvancedMidiEditor = ({ song }: Props) => {
	const {
		timeline,
		cellNotesByTime,
		isNotePopupOpen,
		maxDuration,
		editingNote,
		closeNotePopup,
		onCreateNote,
		onUpdateNote,
		openNotePopup,
	} = useMidiEditor({ song });

	return (
		<>
			<Box className={styles.container}>
				<Box className={styles.headerWrapper}>
					<IconButton
						className={styles.addButton}
						onClick={openNotePopup}
						style={{ width: TIME_RULER_WIDTH }}
					>
						<Add />
					</IconButton>

					<TrackHeader />
				</Box>

				<Box className={styles.content}>
					<EditorContent timeline={timeline} cellNotesByTime={cellNotesByTime} />
				</Box>
			</Box>

			<NoteActionPopup
				isOpen={isNotePopupOpen}
				maxDuration={maxDuration}
				mode={editingNote ? "edit" : "create"}
				editingNote={editingNote}
				onClose={closeNotePopup}
				onCreateNote={onCreateNote}
				onUpdateNote={onUpdateNote}
			/>
		</>
	);
};

export default AdvancedMidiEditor;
