import "./SongList.scss";
import SongCard from "../card/SongCard";
import SongMetadata from "../metadata/SongMetadata";
import type { Song } from "../../../../types/song.types";

type Props = {
	songs: Song[];
	loading?: boolean;
};

const SongList = ({ songs, loading = false }: Props) => {
	if (loading) {
		return <div>Loading songs...</div>;
	}

	return (
		<div className="song-list">
			{songs.map((song, idx) => (
				<div key={`${song.name}-${idx}`} className="song-list__item">
					<SongCard song={song} />
					<SongMetadata song={song} />
				</div>
			))}
		</div>
	);
};

export default SongList;

