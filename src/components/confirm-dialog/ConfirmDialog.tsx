import type { ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import type { DialogProps } from "@mui/material/Dialog";

type Props = {
	open: boolean;
	title: ReactNode;
	description?: ReactNode | string;
	confirmLabel?: string;
	cancelLabel?: string;
	confirmColor?: ButtonProps["color"];
	onConfirm: () => void;
	onClose: () => void;
	disableConfirm?: boolean;
} & Pick<DialogProps, "maxWidth" | "fullWidth">;

const ConfirmDialog = ({
	open,
	title,
	description,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	confirmColor = "primary",
	onConfirm,
	onClose,
	disableConfirm = false,
	maxWidth = "xs",
	fullWidth = true,
}: Props) => (
	<Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth={fullWidth}>
		<DialogTitle>{title}</DialogTitle>
		{description && (
			<DialogContent>
				{typeof description === "string" ? (
					<DialogContentText>{description}</DialogContentText>
				) : (
					description
				)}
			</DialogContent>
		)}
		<DialogActions>
			<Button onClick={onClose}>{cancelLabel}</Button>
			<Button color={confirmColor} onClick={onConfirm} disabled={disableConfirm}>
				{confirmLabel}
			</Button>
		</DialogActions>
	</Dialog>
);

export default ConfirmDialog;

