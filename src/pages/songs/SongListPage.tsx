import { useState } from "react";
import Container from "@mui/material/Container";
import { useSongPage } from "../../modules/songs/hooks/useSongPage";
import type { Song } from "../../types/song.types";
import SongListHeader from "../../modules/songs/components/list-header/SongListHeader";
import SongList from "../../modules/songs/components/list/SongList";
import SongActionPopup from "../../modules/songs/components/action-popup/SongActionPopup";
import styles from "./SongListPage.module.scss";

const SongListPage = () => {
	const { songs, loading, onCreateSong, onUpdateSong, onDeleteSong } = useSongPage();
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
