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
	const [actionMode, setActionMode] = useState<"create" | "edit">("create");
	const [inEditSongId, setInEditSongId] = useState<number | null>(null);

	const handleAddClick = () => {
		setActionMode("create");
		setInEditSongId(null);
		setPopupOpen(true);
	};

	const handleEditSong = (id: number) => {
		setActionMode("edit");
		setInEditSongId(id);
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);
		setInEditSongId(null);
		setActionMode("create");
	};

	const handleSubmitSong = (song: Song) => {
		if (actionMode === "edit" && inEditSongId !== null) {
			onUpdateSong(inEditSongId, song);
		} else {
			onCreateSong(song);
		}
	};

	useEffect(() => {
		loadSongs();
	}, []);

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
				mode={actionMode}
				initialSong={songs.find((song) => song.id === inEditSongId)}
				onClose={handleClosePopup}
				onCallbackSubmit={handleSubmitSong}
			/>
		</>
	);
};

export default SongListPage;
