import styles from "./TrackHeader.module.scss";

type Props = {};

const instruments = [
	"Drums",
	"Bass",
	"Piano",
	"Guitar",
	"Strings",
	"Synth",
	"Vocals",
	"FX",
	"Percussion",
	"Lead",
];

const TrackHeader = ({}: Props) => {
	const tracks = Array.from({ length: 8 }, (_, index) => index + 1);
	const shuffledInstruments = [...instruments]
		.sort(() => Math.random() - 0.5)
		.slice(0, 8);

	return (
		<div className={styles.trackHeader}>
			{tracks.map((trackNumber, index) => (
				<div key={trackNumber} className={styles.cell}>
					<span className={styles.number}>{trackNumber}</span>
					<span className={styles.label}>{shuffledInstruments[index]}</span>
				</div>
			))}
		</div>
	);
};

export default TrackHeader;

