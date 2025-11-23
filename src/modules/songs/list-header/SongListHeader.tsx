import Button from "@mui/material/Button";
import styles from "./SongListHeader.module.scss";

type Props = {
	onAddClick: () => void;
};

const SongListHeader = ({ onAddClick }: Props) => (
	<div className={styles.container}>
		<h1>Song/Sequence Management</h1>
		<Button variant="contained" onClick={onAddClick}>
			Add Song
		</Button>
	</div>
);

export default SongListHeader;
