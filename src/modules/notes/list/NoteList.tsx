import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import type { Note } from "../../../backend/types/song.types";
import NoteItem from "../item/NoteItem";

type Props = {
	notes: Note[];
	songId: string;
	onDelete: (noteId: number) => void;
};

const NoteList = ({ notes, songId, onDelete }: Props) => {
	if (notes.length === 0) {
		return <Typography variant="body2">No notes yet.</Typography>;
	}

	return (
		<List disablePadding>
			{notes.map((note) => (
				<NoteItem key={note.id} note={note} songId={songId} onDelete={onDelete} />
			))}
		</List>
	);
};

export default NoteList;

