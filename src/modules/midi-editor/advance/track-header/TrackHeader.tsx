import { TIME_RULER_WIDTH, TRACK_COUNT } from "../../_const/midi-editor.cons";
import styles from "./TrackHeader.module.scss";

type Props = {};

const TrackHeader = ({}: Props) => {
	const tracks = Array.from({ length: TRACK_COUNT }, (_, index) => index + 1);

	return (
		<div className={styles.trackHeader} style={{ marginLeft: TIME_RULER_WIDTH }}>
			{tracks.map((trackNumber) => (
				<div key={trackNumber} className={styles.cell}>
					<span className={styles.number}>{trackNumber}</span>
				</div>
			))}
		</div>
	);
};

export default TrackHeader;
