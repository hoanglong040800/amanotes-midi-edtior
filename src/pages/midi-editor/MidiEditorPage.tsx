import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SimpleMidiEditor from "../../modules/midi-editor/simple/SimpleMidiEditor";
import AdvancedMidiEditor from "../../modules/midi-editor/advance/AdvancedMidiEditor";
import { useSongs } from "../../hooks/useSongs";
import type { Song } from "../../backend/types/song.types";
import styles from "./MidiEditorPage.module.scss";
import EditorInfoSection from "../../modules/midi-editor/info/EditorInfoSection";

const MidiEditorPage = () => {
	const navigate = useNavigate();
	const { songId } = useParams<{ songId: string }>();
	const { loadSingleSong } = useSongs();
	const [isLoading, setIsLoading] = useState(true);
	const [song, setSong] = useState<Song | null>(null);
	const [loadError, setLoadError] = useState<string | null>(null);
	const [editorMode, setEditorMode] = useState<"simple" | "advanced">("advanced");

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

	const handleEditorModeChange = (
		_: MouseEvent<HTMLElement>,
		nextMode: "simple" | "advanced" | null
	) => {
		if (!nextMode) {
			return;
		}

		setEditorMode(nextMode);
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

		if (editorMode === "simple") {
			return <SimpleMidiEditor song={song} />;
		}

		return <AdvancedMidiEditor song={song} />;
	};

	return (
		<Box className={styles.editor}>
			<EditorInfoSection
				song={song}
				editorMode={editorMode}
				onBack={handleBack}
				onEditorModeChange={handleEditorModeChange}
			/>
			<Box className={styles.editorCard}>{renderEditorContent()}</Box>
		</Box>
	);
};

export default MidiEditorPage;
