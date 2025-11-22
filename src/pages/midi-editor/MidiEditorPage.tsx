import { Box, Typography } from "@mui/material";
import styles from "./MidiEditorPage.module.scss";

const MidiEditorPage = () => {
	return (
		<Box className={styles.editor}>
			<Typography variant="h4" component="h1" gutterBottom className={styles.title}>
				MIDI Editor
			</Typography>
			<Typography variant="body1" className={styles.desc}>
				This is the MIDI Piano Roll / Editor page. (Coming soon)
			</Typography>
		</Box>
	);
};

export default MidiEditorPage;
