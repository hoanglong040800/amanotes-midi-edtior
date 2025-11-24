import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AdvancedMidiEditor from "../../modules/midi-editor/advance/AdvancedMidiEditor";
import { useSongs } from "../../hooks/useSongs";
import styles from "./MidiEditorPage.module.scss";
import EditorHeader from "../../modules/midi-editor/editor-header/EditorHeader";
import type { GetSongWithNotes } from "../../backend/dto/song.dto";

const MidiEditorPage = () => {
	const navigate = useNavigate();
	const { songId } = useParams<{ songId: string }>();
	const { loadSingleSong } = useSongs();
	const [isLoading, setIsLoading] = useState(true);
	const [song, setSong] = useState<GetSongWithNotes | null>(null);
	const [loadError, setLoadError] = useState<string | null>(null);

	async function fetchSong() {
		setIsLoading(true);
		setLoadError(null);

		if (!songId) {
			setLoadError("No song ID provided");
			setSong(null);
			return;
		}

		try {
			const foundSong = await loadSingleSong(songId);

			if (!foundSong) {
				setLoadError("Song not found");
				setSong(null);
				return;
			}

			setSong(foundSong);
		} catch {
			setLoadError("Unable to load song");
			setSong(null);
		} finally {
			setIsLoading(false);
		}
	}

	const handleBack = () => {
		navigate("/songs");
	};

	// ---- EFFECTS ----

	useEffect(() => {
		fetchSong();
	}, [songId]);

	// ---- RENDER ----

	const renderEditorContent = () => {
		if (isLoading) {
			return (
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
					<CircularProgress />
				</Box>
			);
		}

		if (loadError) {
			return (
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
					<Typography color="error">{loadError}</Typography>
				</Box>
			);
		}

		if (!song) {
			return (
				<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
					<Typography color="error">Song not found</Typography>
				</Box>
			);
		}

		return <AdvancedMidiEditor song={song} />;
	};

	return (
		<Box className={styles.editor}>
			<EditorHeader
				song={song}
				onBack={handleBack}
			/>
			<Box className={styles.editorCard}>{renderEditorContent()}</Box>
		</Box>
	);
};

export default MidiEditorPage;
