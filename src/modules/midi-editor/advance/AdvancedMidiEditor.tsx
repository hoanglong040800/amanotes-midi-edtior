import type { Song } from "../../../backend/types/song.types";
import { Box } from "@mui/material";
import TrackHeader from "./track-header/TrackHeader";
import EditorContent from "./content/EditorContent";
import styles from "./AdvancedMidiEditor.module.scss";
import { useMidiEditor } from "../_hooks/useMidiEditor";

type Props = {
	song: Song;
};

const AdvancedMidiEditor = ({ song }: Props) => {
	const { timeline, cellNotesByTime } = useMidiEditor({ song });

	return (
		<Box className={styles.container}>
			<Box className={styles.headerWrapper}>
				<TrackHeader />
			</Box>

			<Box className={styles.content}>
				<EditorContent timeline={timeline} cellNotesByTime={cellNotesByTime} />
			</Box>
		</Box>
	);
};

export default AdvancedMidiEditor;
