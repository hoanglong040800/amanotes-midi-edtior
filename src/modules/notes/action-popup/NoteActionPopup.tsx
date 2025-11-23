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
import type { CreateNoteInput } from "../../../backend/dto/songs.dto";
import { createNoteFormSchema } from "../_validation/note.validation";

type NoteFormValues = {
	track: number;
	time: number;
	title: string;
	description: string;
	color: string;
};

type Props = {
	isOpen: boolean;
	maxDuration: number;
	onClose: () => void;
	onCreateNote: (input: CreateNoteInput) => void;
};

const DEFAULT_VALUES: NoteFormValues = {
	track: 1,
	time: 0,
	title: "",
	description: "",
	color: "#3B82F6",
};

const NoteActionPopup = ({ isOpen, maxDuration, onClose, onCreateNote }: Props) => {
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

	useEffect(() => {
		if (!isOpen) {
			reset(DEFAULT_VALUES);
		}
	}, [isOpen, reset]);

	useEffect(() => {
		const currentTime = getValues("time");

		if (currentTime > maxDuration) {
			setValue("time", maxDuration);
		}
	}, [getValues, maxDuration, setValue]);

	const submitForm = handleSubmit((values) => {
		onCreateNote({
			track: values.track,
			time: values.time,
			title: values.title,
			description: values.description,
			color: values.color,
		});

		reset(DEFAULT_VALUES);
		onClose();
	});

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth="xs" fullWidth>
			<FormProvider {...form}>
				<form onSubmit={submitForm} noValidate>
					<DialogTitle>Create Note</DialogTitle>

					<DialogContent sx={{ pt: 2 }}>
						<Stack spacing={2}>
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
										step: 0.1,
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
					<DialogActions sx={{ px: 3, pb: 3 }}>
						<Button onClick={onClose}>Cancel</Button>
						<Button type="submit" variant="contained" disabled={isSubmitting}>
							Create
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	);
};

export default NoteActionPopup;
