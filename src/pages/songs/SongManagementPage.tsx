import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useSongs } from "../../hooks/useSongs";
import type { Song } from "../../backend/types/song.types";
import SongListHeader from "../../modules/songs/list-header/SongListHeader";
import SongList from "../../modules/songs/list/SongList";
import SongActionPopup from "../../modules/songs/action-popup/SongActionPopup";
import styles from "./SongManagementPage.module.scss";

const SongListPage = () => {
	const [songs, setSongs] = useState<Song[]>([]);
	const { isLoading, loadMultiSongs, onCreateSong, onUpdateSong, onDeleteSong } =
		useSongs();
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [actionMode, setActionMode] = useState<"create" | "edit">("create");
	const [inEditSongId, setInEditSongId] = useState<string | null>(null);

	const handleAddClick = () => {
		setActionMode("create");
		setInEditSongId(null);
		setPopupOpen(true);
	};

	const handleEditSong = (id: string) => {
		setActionMode("edit");
		setInEditSongId(id);
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);
		setInEditSongId(null);
		setActionMode("create");
	};

	const handleSubmitSong = async (song: Song) => {
		try {
			if (actionMode === "edit" && inEditSongId !== null) {
				await onUpdateSong(inEditSongId, song);
			} else {
				await onCreateSong(song);
			}
			// Refresh songs list
			await fetchSongs();
		} catch (error) {
			console.error("Failed to submit song:", error);
		}
	};

	const handleDeleteSong = async (songId: string) => {
		try {
			await onDeleteSong(songId);
			// Refresh songs list
			await fetchSongs();
		} catch (error) {
			console.error("Failed to delete song:", error);
		}
	};

	async function fetchSongs() {
		const fetchedSongs = await loadMultiSongs();
		setSongs(fetchedSongs);
	}

	useEffect(() => {
		fetchSongs();
	}, []);

	return (
		<>
			<Container maxWidth="md" className={styles.editor}>
			<SongListHeader onAddClick={handleAddClick} />
			<SongList
				songs={songs}
				loading={isLoading}
				onDeleteSong={handleDeleteSong}
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
