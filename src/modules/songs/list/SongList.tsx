import { useState } from "react";
import type { Song } from "../../../backend/types/song.types";
import ConfirmDialog from "../../../components/confirm-dialog/ConfirmDialog";
import SongItems from "./SongItems";

type Props = {
	songs: Song[];
	loading?: boolean;
	onDeleteSong: (songId: string) => void;
	onEditSong: (songId: string) => void;
};

const SongList = ({ songs, loading = false, onDeleteSong, onEditSong }: Props) => {
	const [pendingDeleteSongId, setPendingDeleteSongId] = useState<string | null>(null);

	const handleOpenConfirm = (songId: string) => setPendingDeleteSongId(songId);
	const handleCloseConfirm = () => setPendingDeleteSongId(null);
	const handleConfirmDelete = () => {
		if (pendingDeleteSongId === null) return;

		onDeleteSong(pendingDeleteSongId);
		setPendingDeleteSongId(null);
	};

	if (loading) {
		return <div>Loading songs...</div>;
	}

	const songNamePendingDeletion =
		pendingDeleteSongId !== null ? songs.find((song) => song.id === pendingDeleteSongId)?.name : undefined;

	return (
		<>
			<SongItems
				songs={songs}
				onEditSong={onEditSong}
				onDeleteRequest={handleOpenConfirm}
			/>

			<ConfirmDialog
				open={pendingDeleteSongId !== null}
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
