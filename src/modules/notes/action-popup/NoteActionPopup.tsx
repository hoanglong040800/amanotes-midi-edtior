import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, FormProvider, type Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import type { CreateNoteInput, UpdateNoteInput } from "../../../backend/dto/note.dto";
import type { Note } from "../../../backend/types/song.types";
import { createNoteFormSchema } from "../_validation/note.validation";
import styles from "./NoteActionPopup.module.scss";
import type { CreateNotePopupType } from "../../../types/midi-editor.types";

type NoteFormValues = {
	track: number;
	time: number;
	title: string;
	description: string;
	color: string;
};

type Props = {
	songId: string;
	isOpen: boolean;
	maxDuration: number;
	mode?: "create" | "edit";
	editingNote?: Note | null;
	createPosition?: CreateNotePopupType | null;
	onClose: () => void;
	onCreateNote: (input: CreateNoteInput) => void;
	onUpdateNote: (noteId: string, input: UpdateNoteInput) => void;
	onDeleteNote: (noteId: string) => void;
};

const DEFAULT_VALUES: NoteFormValues = {
	track: 1,
	time: 0,
	title: "",
	description: "",
	color: "#3B82F6",
};

const NoteActionPopup = ({
	songId,
	isOpen,
	maxDuration,
	mode = "create",
	editingNote,
	createPosition,
	onClose,
	onCreateNote,
	onUpdateNote,
	onDeleteNote,
}: Props) => {
	const form = useForm<NoteFormValues>({
		defaultValues: DEFAULT_VALUES,
		resolver: yupResolver(createNoteFormSchema(maxDuration)) as Resolver<NoteFormValues>,
		mode: "onTouched",
	});

	const {
		handleSubmit,
		reset,
		control,
		register,
		formState: { errors, isSubmitting },
		setValue,
		getValues,
	} = form;

	// ----- EFFECTS -----

	useEffect(() => {
		if (isOpen && mode === "edit" && editingNote) {
			reset({
				track: editingNote.track,
				time: editingNote.time,
				title: editingNote.title,
				description: editingNote.description ?? "",
				color: editingNote.color,
			});
		} else if (isOpen && mode === "create" && createPosition) {
			reset({
				track: createPosition.track,
				time: createPosition.time,
				title: "",
				description: "",
				color: "#3B82F6",
			});
		} else if (!isOpen) {
			reset(DEFAULT_VALUES);
		}
	}, [isOpen, mode, editingNote, reset]);

	// ----- FUNCTIONS -----

	const submitForm = handleSubmit((values) => {
		if (mode === "edit" && editingNote && onUpdateNote) {
			onUpdateNote(editingNote.id, {
				track: values.track,
				time: values.time,
				title: values.title,
				description: values.description,
				color: values.color,
			});
		} else {
			onCreateNote({
				track: values.track,
				time: values.time,
				title: values.title,
				description: values.description,
				color: values.color,
				songId: songId,
			});
		}

		reset(DEFAULT_VALUES);
		onClose();
	});

	// ----- RENDER -----

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
			<FormProvider {...form}>
				<form onSubmit={submitForm} noValidate>
					<DialogTitle>{mode === "edit" ? "Update Note" : "Create Note"}</DialogTitle>

					<DialogContent className={styles.content}>
						<Stack spacing={2} className={styles.stack}>
							<TextField
								{...register("track", { valueAsNumber: true })}
								label="Track"
								type="number"
								fullWidth
								required
								slotProps={{
									htmlInput: {
										min: 1,
										max: 8,
										step: 1,
									},
								}}
								error={!!errors.track}
								helperText={errors.track?.message}
							/>

							<TextField
								{...register("time", { valueAsNumber: true })}
								label="Time"
								type="number"
								fullWidth
								required
								slotProps={{
									htmlInput: {
										min: 0,
										max: maxDuration,
										step: 5,
									},
									input: {
										endAdornment: <InputAdornment position="end">s</InputAdornment>,
									},
								}}
								error={!!errors.time}
								helperText={errors.time?.message}
							/>

							<TextField
								label="Title"
								placeholder="Kick accent"
								fullWidth
								required
								{...register("title")}
								error={Boolean(errors.title)}
								helperText={errors.title?.message}
							/>

							<TextField
								label="Description"
								placeholder="Optional details..."
								fullWidth
								multiline
								minRows={2}
								{...register("description")}
								error={!!errors.description}
								helperText={errors.description?.message}
							/>

							<Controller
								name="color"
								control={control}
								render={({ field }) => (
									<TextField
										label="Color"
										type="color"
										fullWidth
										value={field.value}
										onChange={field.onChange}
										error={!!errors.color}
										helperText={errors.color?.message}
									/>
								)}
							/>
						</Stack>
					</DialogContent>

					<DialogActions className={styles.actions}>
						<Button onClick={onClose}>Cancel</Button>

						{mode === "edit" && editingNote && (
							<Button onClick={() => onDeleteNote(editingNote.id)} color="error">
								Delete
							</Button>
						)}

						<Button type="submit" variant="contained" disabled={isSubmitting}>
							{mode === "edit" ? "Update" : "Create"}
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	);
};

export default NoteActionPopup;
