import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import type { Note } from "../../../types/song.types";
import NoteItem from "../item/NoteItem";

type Props = {
	notes: Note[];
};

const NoteList = ({ notes }: Props) => {
	if (notes.length === 0) {
		return <Typography variant="body2">No notes yet.</Typography>;
	}

	return (
		<List disablePadding>
			{notes.map((note) => (
				<NoteItem key={note.id} note={note} />
			))}
		</List>
	);
};

export default NoteList;

