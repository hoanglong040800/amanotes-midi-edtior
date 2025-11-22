import { useState } from "react";
import Container from "@mui/material/Container";
import { useSongPage } from "../../modules/songs/hooks/useSongPage";
import SongListHeader from "../../modules/songs/components/list-header/SongListHeader";
import SongList from "../../modules/songs/components/list/SongList";
import SongActionPopup from "../../modules/songs/components/action-popup/SongActionPopup";
import styles from "./SongListPage.module.scss";

const SongListPage = () => {
	const { songs, loading, onCallbackSubmit, onDeleteSong } = useSongPage();
	const [isPopupOpen, setPopupOpen] = useState(false);

	const handleAddClick = () => setPopupOpen(true);
	const handleClosePopup = () => setPopupOpen(false);

	return (
		<>
			<Container maxWidth="md" className={styles.editor}>
				<SongListHeader onAddClick={handleAddClick} />
				<SongList songs={songs} loading={loading} onDeleteSong={onDeleteSong} />
			</Container>

			<SongActionPopup
				isOpen={isPopupOpen}
				onClose={handleClosePopup}
				onCallbackSubmit={onCallbackSubmit}
			/>
		</>
	);
};

export default SongListPage;
