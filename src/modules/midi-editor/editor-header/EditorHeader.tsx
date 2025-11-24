import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Typography } from "@mui/material";

import styles from "./EditorHeader.module.scss";
import type { GetSongWithNotes } from "../../../backend/dto/song.dto";

type Props = {
	song: GetSongWithNotes | null;
	onBack: () => void;
};

const EditorHeader = ({ song, onBack }: Props) => (
	<Box className={styles.container}>
		<Box className={styles.headerRow}>
			<Button
				variant="text"
				onClick={onBack}
				className={styles.backButton}
				startIcon={<ArrowBackIosNewIcon fontSize="small" />}
			>
				Back to songs
			</Button>

			<Typography variant="h4" component="h1" className={styles.title}>
				{song?.name || "MIDI Editor"}
			</Typography>
		</Box>
	</Box>
);

export default EditorHeader;
