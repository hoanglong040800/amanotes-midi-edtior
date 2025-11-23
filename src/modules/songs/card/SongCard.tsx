import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./SongCard.module.scss";
import type { Song } from "../../../backend/types/song.types";
import { useNavigate } from "react-router-dom";

type Props = {
	song: Song;
};

const SongCard = ({ song }: Props) => {
	const navigate = useNavigate();

	const handleOpenEditor = () => {
		navigate(`/songs/${song.id}/editor`);
	};

	return (
		<Card className={styles.card} variant="outlined">
			<CardActionArea className={styles.action} onClick={handleOpenEditor}>
				<CardContent className={styles.content}>
					<div className={styles.text}>
						<Typography variant="h6" className={styles.title}>
							{song.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{song.description}
						</Typography>
					</div>

					<div className={styles.openEditor} aria-hidden>
						<ChevronRightIcon fontSize="small" />
					</div>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default SongCard;
