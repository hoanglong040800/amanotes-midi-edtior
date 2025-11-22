import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import SimpleMidiEditor from "../../modules/midi-editor/simple/SimpleMidiEditor";
import { loadSingleSong } from "../../hooks/useSongs";
import type { Song } from "../../types/song.types";
import styles from "./MidiEditorPage.module.scss";

const MidiEditorPage = () => {
	const navigate = useNavigate();
	const { songId } = useParams<{ songId: string }>();
	const [song, setSong] = useState<Song | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	async function fetchSong() {
		try {
			const { song: foundSong, error: loadError } = await loadSingleSong(songId);

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

	return (
		<Box className={styles.editor}>
			<Button
				variant="text"
				onClick={handleBack}
				className={styles.backButton}
				startIcon={<ArrowBackIosNewIcon fontSize="small" />}
			>
				Back to songs
			</Button>
			<Typography variant="h4" component="h1" gutterBottom className={styles.title}>
				MIDI Editor
			</Typography>
			<SimpleMidiEditor song={song} loading={loading} error={error} />
		</Box>
	);
};

export default MidiEditorPage;
