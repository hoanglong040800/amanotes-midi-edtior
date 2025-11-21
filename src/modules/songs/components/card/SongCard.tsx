import "./SongCard.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type { Song } from "../../../../types/song.types";

type Props = {
	song: Song;
};

const SongCard = ({ song }: Props) => (
	<Card className="card" variant="outlined">
		<CardContent>
			<Typography variant="h6" className="title">
				{song.name}
			</Typography>
			<Typography variant="body2" color="text.secondary">
				{song.description}
			</Typography>
		</CardContent>
	</Card>
);

export default SongCard;
