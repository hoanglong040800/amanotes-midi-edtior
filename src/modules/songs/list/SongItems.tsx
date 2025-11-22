import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import SongCard from "../card/SongCard";
import SongMetadata from "../metadata/SongMetadata";
import type { Song } from "../../../types/song.types";
import styles from "./SongItems.module.scss";

type Props = {
	songs: Song[];
	onEditSong: (songId: number) => void;
	onOpenEditor: (index: number) => void;
	onDeleteRequest: (songId: number) => void;
};

const SongItems = ({ songs, onEditSong, onOpenEditor, onDeleteRequest }: Props) => (
	<div className={styles.list}>
		{songs.map((song, idx) => (
			<div key={`${song.id ?? song.name}-${idx}`} className={styles.item}>
				<div className={styles.actions}>
					<IconButton size="small" onClick={() => onEditSong(song.id)}>
						<EditOutlinedIcon fontSize="small" />
					</IconButton>

					<IconButton size="small" onClick={() => onDeleteRequest(song.id)}>
						<DeleteOutlineIcon fontSize="small" />
					</IconButton>
				</div>

				<div className={styles.content}>
					<SongCard song={song} onOpenEditor={() => onOpenEditor(idx)} />
					<SongMetadata song={song} />
				</div>
			</div>
		))}
	</div>
);

export default SongItems;

