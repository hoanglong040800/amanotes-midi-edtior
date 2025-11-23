import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SimpleMidiEditor from "../../modules/midi-editor/simple/SimpleMidiEditor";
import AdvancedMidiEditor from "../../modules/midi-editor/advance/AdvancedMidiEditor";
import { useSongs } from "../../hooks/useSongs";
import type { Song } from "../../backend/types/song.types";
import EditorInfoSection from "../../modules/midi-editor/info/EditorInfoSection";
import styles from "./MidiEditorPage.module.scss";

const MidiEditorPage = () => {
	const navigate = useNavigate();
	const { songId } = useParams<{ songId: string }>();
	const { isLoading, loadSingleSong } = useSongs();
	const [song, setSong] = useState<Song | null>(null);
	const [loadError, setLoadError] = useState<string | null>(null);
	const [editorMode, setEditorMode] = useState<"simple" | "advanced">("simple");
	const [showSongInfo, setShowSongInfo] = useState(true);

	async function fetchSong() {
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

	const handleSongInfoToggle = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
		setShowSongInfo(checked);
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

		if (editorMode === "simple") {
			return <SimpleMidiEditor song={song} loading={isLoading} error={loadError} />;
		}

		return <AdvancedMidiEditor song={song} loading={isLoading} error={loadError} />;
	};

	const canShowSongInfo = Boolean(showSongInfo && !isLoading && !loadError && song);

	return (
		<Box className={styles.editor}>
			<EditorInfoSection
				song={song}
				editorMode={editorMode}
				showSongInfo={showSongInfo}
				showMetadata={canShowSongInfo}
				onBack={handleBack}
				onEditorModeChange={handleEditorModeChange}
				onSongInfoToggle={handleSongInfoToggle}
			/>
			<Box className={styles.editorCard}>{renderEditorContent()}</Box>
		</Box>
	);
};

export default MidiEditorPage;
