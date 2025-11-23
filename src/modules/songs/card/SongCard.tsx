import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./SongCard.module.scss";
import type { Song } from "../../../api/types/song.types";

type Props = {
	song: Song;
	onOpenEditor?: () => void;
};

const SongCard = ({ song, onOpenEditor }: Props) => {
	const handleOpenEditor = () => {
		if (!onOpenEditor) {
			return;
		}

		onOpenEditor();
	};

	return (
		<Card className={styles.card} variant="outlined">
			<CardActionArea
				className={styles.action}
				onClick={handleOpenEditor}
				disabled={!onOpenEditor}
				aria-label={onOpenEditor ? "Open MIDI editor" : undefined}
			>
				<CardContent className={styles.content}>
					<div className={styles.text}>
						<Typography variant="h6" className={styles.title}>
							{song.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{song.description}
						</Typography>
					</div>

					{onOpenEditor ? (
						<div className={styles.openEditor} aria-hidden>
							<ChevronRightIcon fontSize="small" />
						</div>
					) : null}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default SongCard;
