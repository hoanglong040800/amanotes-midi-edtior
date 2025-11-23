import type { ChangeEvent, MouseEvent } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
	Box,
	Button,
	FormControlLabel,
	Switch,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import SongInfo from "../../songs/info/SongInfo";
import type { Song } from "../../../backend/types/song.types";
import styles from "./EditorInfoSection.module.scss";

type Props = {
	song: Song | null;
	editorMode: "simple" | "advanced";
	showSongInfo: boolean;
	showMetadata: boolean;
	onBack: () => void;
	onEditorModeChange: (event: MouseEvent<HTMLElement>, mode: "simple" | "advanced" | null) => void;
	onSongInfoToggle: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const EditorInfoSection = ({
	song,
	editorMode,
	showSongInfo,
	showMetadata,
	onBack,
	onEditorModeChange,
	onSongInfoToggle,
}: Props) => (
	<Box className={styles.container}>
		<Box className={styles.controlsRow}>
			<Button
				variant="text"
				onClick={onBack}
				className={styles.backButton}
				startIcon={<ArrowBackIosNewIcon fontSize="small" />}
			>
				Back to songs
			</Button>

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

		<Box className={styles.titleRow}>
			<Typography variant="h4" component="h1" gutterBottom className={styles.title}>
				{song?.name || "MIDI Editor"}
			</Typography>

			<FormControlLabel
				className={styles.infoSwitch}
				control={
					<Switch checked={showSongInfo} onChange={onSongInfoToggle} size="small" color="primary" />
				}
				label="Song info"
			/>
		</Box>

		{showMetadata && song ? (
			<Box className={styles.songInfo}>
				<SongInfo song={song} />
			</Box>
		) : null}
	</Box>
);

export default EditorInfoSection;
