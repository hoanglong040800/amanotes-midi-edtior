import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TIME_RULER_WIDTH } from "../../_const/midi-editor.cons";
import { useEditorContent } from "../../_hooks/useEditorContent";
import styles from "./EditorContent.module.scss";

type Props = {
	duration: number;
};

const EditorContent = ({ duration }: Props) => {
	const { rows } = useEditorContent({ duration, styles });

	return (
		<Box className={styles.wrapper}>
			<Box className={styles.grid} sx={{ gridTemplateColumns: `${TIME_RULER_WIDTH}px 1fr` }}>
				{rows.map((row) => (
					<Fragment key={row.id}>
						<Box className={row.rulerClassName}>
							<Typography variant="body2" color="text.secondary">
								{row.timeLabel}
							</Typography>
						</Box>

						<Box className={row.contentClassName}>
							<Box className={styles.timelineLine} />
							<Typography variant="body2" color="text.secondary" className={styles.timelineLabel}>
								{row.timelineLabel}
							</Typography>
						</Box>
					</Fragment>
				))}
			</Box>
		</Box>
	);
};

export default EditorContent;

