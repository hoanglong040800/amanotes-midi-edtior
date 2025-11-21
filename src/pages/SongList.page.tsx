import React from "react";
import { useSongPage } from "../modules/songs/hooks/useSongPage";
import SongListHeader from "../modules/songs/components/list-header/SongListHeader";
import SongCard from "../modules/songs/components/card/SongCard";
import SongMetadata from "../modules/songs/components/metadata/SongMetadata";
import Container from "@mui/material/Container";

const SongListPage: React.FC = () => {
	const { songs, loading } = useSongPage();

	return (
		<Container maxWidth="md">
			<SongListHeader />
			{loading ? (
				<div>Loading songs...</div>
			) : (
				songs.map((song, idx) => (
					<div key={idx} style={{ marginBottom: 32 }}>
						<SongCard song={song} />
						<SongMetadata song={song} />
					</div>
				))
			)}
		</Container>
	);
};

export default SongListPage;
