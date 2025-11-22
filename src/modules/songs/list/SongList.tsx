import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import "./SongList.scss";
import SongCard from "../card/SongCard";
import SongMetadata from "../metadata/SongMetadata";
import type { Song } from "../../../types/song.types";
import ConfirmDialog from "../../../components/confirm-dialog/ConfirmDialog";

type Props = {
	songs: Song[];
	loading?: boolean;
	onDeleteSong: (index: number) => void;
	onEditSong: (index: number) => void;
};

const SongList = ({ songs, loading = false, onDeleteSong, onEditSong }: Props) => {
	const [pendingDeleteIndex, setPendingDeleteIndex] = useState<number | null>(null);
	const navigate = useNavigate();
	const handleOpenEditor = (index: number) => {
		navigate(`/songs/${index}/editor`);
	};

	const handleOpenConfirm = (index: number) => setPendingDeleteIndex(index);
	const handleCloseConfirm = () => setPendingDeleteIndex(null);
	const handleConfirmDelete = () => {
		if (pendingDeleteIndex === null) return;

		onDeleteSong(pendingDeleteIndex);
		setPendingDeleteIndex(null);
	};

	if (loading) {
		return <div>Loading songs...</div>;
	}

	const songNamePendingDeletion =
		pendingDeleteIndex !== null ? songs[pendingDeleteIndex]?.name : undefined;

	return (
		<>
			<div className="song-list">
				{songs.map((song, idx) => (
					<div key={`${song.name}-${idx}`} className="item">
						<div className="actions">
							<IconButton size="small" onClick={() => onEditSong(idx)}>
								<EditOutlinedIcon fontSize="small" />
							</IconButton>

							<IconButton size="small" onClick={() => handleOpenConfirm(idx)}>
								<DeleteOutlineIcon fontSize="small" />
							</IconButton>
						</div>
						<SongCard song={song} onOpenEditor={() => handleOpenEditor(idx)} />
						<SongMetadata song={song} />
					</div>
				))}
			</div>

			<ConfirmDialog
				open={pendingDeleteIndex !== null}
				title="Delete song"
				description={
					<div>
						Are you sure you want to delete{" "}
						<strong>{songNamePendingDeletion ?? "this song"}</strong>?
					</div>
				}
				confirmLabel="Delete"
				confirmColor="error"
				onClose={handleCloseConfirm}
				onConfirm={handleConfirmDelete}
			/>
		</>
	);
};

export default SongList;
