import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Note } from "../../../backend/types/song.types";
import { NoteApi } from "../../../backend/api";
import styles from "./NoteItem.module.scss";

type Props = {
	note: Note;
	songId: string;
	onEdit: (noteId: number) => void;
	onDelete: (noteId: number) => void;
};

const NoteItem = ({ note, songId, onEdit, onDelete }: Props) => {
	function handleEdit() {
		onEdit(note.id);
	}

	async function handleDelete() {
		try {
			await NoteApi.deleteNote(songId, note.id);
			onDelete(note.id);
		} catch (error) {
			console.error("Failed to delete note:", error);
		}
	}

	return (
		<ListItem disableGutters dense className={styles.item}>
			<Box
				className={styles.colorBox}
				sx={{
					backgroundColor: note.color,
				}}
			/>
		<ListItemText
			primary={note.title}
			secondary={`Track ${note.track} • Time ${note.time}s${
				note.description ? ` • ${note.description}` : ""
			}`}
		/>
		<IconButton
			onClick={handleEdit}
			size="small"
			className={styles.editButton}
			aria-label="edit note"
		>
			<EditIcon fontSize="small" />
		</IconButton>
		<IconButton
			onClick={handleDelete}
			size="small"
			className={styles.deleteButton}
			aria-label="delete note"
		>
			<DeleteIcon fontSize="small" />
		</IconButton>
		</ListItem>
	);
};

export default NoteItem;
