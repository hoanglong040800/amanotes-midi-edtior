import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import type { Note } from "../../../types/song.types";

type Props = {
	note: Note;
};

const NoteItem = ({ note }: Props) => (
	<ListItem
		disableGutters
		dense
		sx={{
			borderBottom: "1px solid #e5e7eb",
			paddingY: 1,
		}}
	>
		<ListItemText
			primary={note.title}
			secondary={`Track ${note.track} • Time ${note.time}s${
				note.description ? ` • ${note.description}` : ""
			}`}
			primaryTypographyProps={{ fontWeight: 600 }}
		/>
	</ListItem>
);

export default NoteItem;

