import { useState } from "react";
import Container from "@mui/material/Container";
import { useSongPage } from "../../modules/songs/hooks/useSongPage";
import SongListHeader from "../../modules/songs/components/list-header/SongListHeader";
import SongCard from "../../modules/songs/components/card/SongCard";
import SongMetadata from "../../modules/songs/components/metadata/SongMetadata";
import SongActionPopup from "../../modules/songs/components/action-popup/SongActionPopup";
import "./SongList.page.scss";

const SongListPage = () => {
	const { songs, loading, onCallbackSubmit } = useSongPage();
	const [isPopupOpen, setPopupOpen] = useState(false);

	const handleAddClick = () => setPopupOpen(true);
	const handleClosePopup = () => setPopupOpen(false);

	return (
		<>
			<Container maxWidth="md">
				<SongListHeader onAddClick={handleAddClick} />
				{loading ? (
					<div>Loading songs...</div>
				) : (
					songs.map((song, idx) => (
						<div key={idx} className="item">
							<SongCard song={song} />
							<SongMetadata song={song} />
						</div>
					))
				)}
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
