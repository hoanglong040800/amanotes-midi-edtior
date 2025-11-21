import "./SongListHeader.scss";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

type Props = {
	onAddClick: () => void;
};

const SongListHeader = ({ onAddClick }: Props) => (
	<Container className="container" maxWidth="md">
		<h1>Song/Sequence Management</h1>
		<Button variant="contained" onClick={onAddClick}>
			Add Song
		</Button>
	</Container>
);

export default SongListHeader;
