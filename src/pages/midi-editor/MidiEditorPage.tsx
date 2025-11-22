import { useEffect, useState } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SimpleMidiEditor from "../../modules/midi-editor/simple/SimpleMidiEditor";
import AdvancedMidiEditor from "../../modules/midi-editor/advance/AdvancedMidiEditor";
import { useSongs } from "../../hooks/useSongs";
import type { Song } from "../../types/song.types";
import EditorInfoSection from "../../modules/midi-editor/info/EditorInfoSection";
import styles from "./MidiEditorPage.module.scss";

const MidiEditorPage = () => {
	const navigate = useNavigate();
	const { songId } = useParams<{ songId: string }>();
	const { loadSong } = useSongs();
	const [song, setSong] = useState<Song | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [editorMode, setEditorMode] = useState<"simple" | "advanced">("simple");
	const [showSongInfo, setShowSongInfo] = useState(true);

	async function fetchSong() {
		try {
			const { song: foundSong, error: loadError } = await loadSong(songId);

			if (!foundSong && loadError) {
				setError(loadError);
				setSong(null);
				return;
			}

			setSong(foundSong);
		} catch (error) {
			setSong(null);
			setError(`Unable to load song`);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		setLoading(true);

		fetchSong();
	}, [songId]);

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

	const canShowSongInfo = Boolean(showSongInfo && !loading && !error && song);

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
			<Box className={styles.editorCard}>
				{editorMode === "simple" ? (
					<SimpleMidiEditor song={song} loading={loading} error={error} />
				) : (
					<AdvancedMidiEditor song={song} loading={loading} error={error} />
				)}
			</Box>
		</Box>
	);
};

export default MidiEditorPage;
