import { Box, Typography } from "@mui/material";
import "../../styles/App.scss";

const MidiEditorPage = () => {
  return (
    <Box className="editor">
      <Typography variant="h4" component="h1" gutterBottom>
        MIDI Editor
      </Typography>
      <Typography variant="body1" className="desc">
        This is the MIDI Piano Roll / Editor page. (Coming soon)
      </Typography>
    </Box>
  );
};

export default MidiEditorPage;
