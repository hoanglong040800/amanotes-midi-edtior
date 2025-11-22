import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useSongs } from "../../hooks/useSongs";
import type { Song } from "../../types/song.types";
import SongListHeader from "../../modules/songs/list-header/SongListHeader";
import SongList from "../../modules/songs/list/SongList";
import SongActionPopup from "../../modules/songs/action-popup/SongActionPopup";
import styles from "./SongManagementPage.module.scss";

const SongListPage = () => {
	const { songs, loading, loadSongs, onCreateSong, onUpdateSong, onDeleteSong } = useSongs();
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

	useEffect(() => {
		void loadSongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddClick = () => {
		setEditingIndex(null);
		setPopupOpen(true);
	};

	const handleEditSong = (index: number) => {
		setEditingIndex(index);
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);
		setEditingIndex(null);
	};

	const handleSubmitSong = (song: Song) => {
		if (editingIndex !== null) {
			onUpdateSong(editingIndex, song);
		} else {
			onCreateSong(song);
		}
	};

	const popupMode = editingIndex !== null ? "edit" : "create";
	const editingSong = editingIndex !== null ? songs[editingIndex] : undefined;

	return (
		<>
			<Container maxWidth="md" className={styles.editor}>
				<SongListHeader onAddClick={handleAddClick} />
				<SongList
					songs={songs}
					loading={loading}
					onDeleteSong={onDeleteSong}
					onEditSong={handleEditSong}
				/>
			</Container>

			<SongActionPopup
				isOpen={isPopupOpen}
				mode={popupMode}
				initialSong={editingSong}
				onClose={handleClosePopup}
				onCallbackSubmit={handleSubmitSong}
			/>
		</>
	);
};

export default SongListPage;
