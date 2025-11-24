import type { CSSProperties } from "react";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TIME_RULER_WIDTH } from "../../_const/midi-editor.cons";
import { useEditorContent } from "../../_hooks/useEditorContent";
import styles from "./EditorContent.module.scss";
import TimeRow from "../time-row/TimeRow";

type Props = {
	duration: number;
};

const EditorContent = ({ duration }: Props) => {
	const { rows } = useEditorContent({ duration, styles });
	const trackCount = 8;
	const tableStyle = { "--ruler-width": `${TIME_RULER_WIDTH}px` } as CSSProperties;

	return (
		<Box className={styles.wrapper}>
			<TableContainer className={styles.tableContainer} style={tableStyle}>
				<Table className={styles.table} size="small">
					<TableBody>
						{rows.map((row) => (
							<TimeRow key={row.id} row={row} trackCount={trackCount} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default EditorContent;
