import "./SongActionPopup.scss";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { FormProvider } from "react-hook-form";
import type { Song } from "../../../../types/song.types";
import { useSongActionPopup } from "../../hooks/useSongActionPopup";
import MultiSelect from "../../../../components/inputs/multi-select/MultiSelect";

type Props = {
	isOpen: boolean;
	mode: "create" | "edit";
	initialSong?: Song;
	onClose: () => void;
	onCallbackSubmit: (song: Song) => void;
};

const SongActionPopup = ({ isOpen, mode, initialSong, onClose, onCallbackSubmit }: Props) => {
	const { form, trackLabelOptions, handleSubmit } = useSongActionPopup({
		onClose,
		onCallbackSubmit,
		mode,
		initialSong,
	});

	const {
		register,
		formState: { errors, isSubmitting },
	} = form;

	return (
		<Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
			<FormProvider {...form}>
				<form className="form" onSubmit={handleSubmit} noValidate>
					<DialogTitle>{mode === "edit" ? "Edit Song" : "Create Song"}</DialogTitle>

					{/* override default pt 0 */}
					<DialogContent className="content" sx={{ pt: 2 }}>
						<TextField
							label="Name"
							placeholder="Rock Beat"
							{...register("name")}
							error={Boolean(errors.name)}
							helperText={errors.name?.message}
							required
							fullWidth
						/>

						<TextField
							label="Duration"
							type="number"
							placeholder="0"
							slotProps={{
								input: {
									endAdornment: <InputAdornment position="end">s</InputAdornment>,
								},
							}}
							{...register("totalDuration", { valueAsNumber: true })}
							error={Boolean(errors.totalDuration)}
							helperText={errors.totalDuration?.message}
							required
							fullWidth
						/>

						<TextField
							label="Description"
							placeholder="Describe the song..."
							{...register("description")}
							error={Boolean(errors.description)}
							helperText={errors.description?.message}
							multiline
							minRows={3}
							fullWidth
						/>

						<MultiSelect name="trackLabels" label="Track Labels" options={trackLabelOptions} />
					</DialogContent>

					<DialogActions className="actions">
						<Button onClick={onClose}>Cancel</Button>
						<Button type="submit" variant="contained" disabled={isSubmitting}>
							Save
						</Button>
					</DialogActions>
				</form>
			</FormProvider>
		</Dialog>
	);
};

export default SongActionPopup;
