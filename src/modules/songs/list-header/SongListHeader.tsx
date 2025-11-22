import "./SongListHeader.scss";
import Button from "@mui/material/Button";

type Props = {
	onAddClick: () => void;
};

const SongListHeader = ({ onAddClick }: Props) => (
	<div className="container">
		<h1>Song/Sequence Management</h1>
		<Button variant="contained" onClick={onAddClick}>
			Add Song
		</Button>
	</div>
);

export default SongListHeader;
