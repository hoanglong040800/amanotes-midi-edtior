import Typography from "@mui/material/Typography";
import type { Song } from "../../../backend/types/song.types";
import { Box } from "@mui/material";
import TrackHeader from "./track-header/TrackHeader";
import EditorContent from "./content/EditorContent";
import styles from "./AdvancedMidiEditor.module.scss";

type Props = {
	song: Song | null;
};

const AdvancedMidiEditor = ({ song }: Props) => {
	if (!song) {
		return <Typography variant="body1">Song not found.</Typography>;
	}

	return (
		<Box className={styles.container}>
			<Box className={styles.headerWrapper}>
				<TrackHeader />
			</Box>

			<Box className={styles.content}>
				<EditorContent song={song} />
			</Box>
		</Box>
	);
};

export default AdvancedMidiEditor;
