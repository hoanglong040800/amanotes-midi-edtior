import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Song } from "../../../types/song.types";
import ConfirmDialog from "../../../components/confirm-dialog/ConfirmDialog";
import SongItems from "./SongItems";

type Props = {
	songs: Song[];
	loading?: boolean;
	onDeleteSong: (index: number) => void;
	onEditSong: (songId: number) => void;
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
			<SongItems
				songs={songs}
				onEditSong={onEditSong}
				onOpenEditor={handleOpenEditor}
				onDeleteRequest={handleOpenConfirm}
			/>

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
