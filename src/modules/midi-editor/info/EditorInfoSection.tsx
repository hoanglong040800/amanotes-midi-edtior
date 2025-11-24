import type { MouseEvent } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import styles from "./EditorInfoSection.module.scss";
import type { GetSongWithNotes } from "../../../backend/dto/song.dto";

type Props = {
	song: GetSongWithNotes;
	editorMode: "simple" | "advanced";
	onBack: () => void;
	onEditorModeChange: (event: MouseEvent<HTMLElement>, mode: "simple" | "advanced" | null) => void;
};

const EditorInfoSection = ({ song, editorMode, onBack, onEditorModeChange }: Props) => (
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

			<ToggleButtonGroup
				value={editorMode}
				exclusive
				onChange={onEditorModeChange}
				className={styles.modeToggle}
				size="small"
			>
				<ToggleButton value="simple" className={styles.modeToggleButton}>
					Simple
				</ToggleButton>

				<ToggleButton value="advanced" className={styles.modeToggleButton}>
					Advanced
				</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	</Box>
);

export default EditorInfoSection;
