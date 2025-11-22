import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TrackType } from "../../../enums/track.enum";
import type { Song } from "../../../types/song.types";
import { TRACK_LABEL_OPTIONS } from "../_utils/song.utils";
import { SONG_FORM_SCHEMA } from "../_validation/song.validation";

type UseSongActionPopupParams = {
	onClose: () => void;
	onCallbackSubmit: (song: Song) => void;
	mode: "create" | "edit";
	initialSong?: Song;
};

type SongActionFormValues = {
	name: string;
	description: string;
	totalDuration: number;
	trackLabels: TrackType[];
};

const DEFAULT_VALUES: SongActionFormValues = {
	name: "",
	description: "",
	totalDuration: 0,
	trackLabels: [],
};

export function useSongActionPopup({
	onClose,
	onCallbackSubmit,
	mode,
	initialSong,
}: UseSongActionPopupParams) {
	const form = useForm<SongActionFormValues>({
		defaultValues: DEFAULT_VALUES,
		resolver: yupResolver(SONG_FORM_SCHEMA) as Resolver<SongActionFormValues>,
	});

	const { handleSubmit, reset } = form;

	const trackLabelOptions = TRACK_LABEL_OPTIONS;

	const submitForm = handleSubmit((values) => {
		const timestamp = new Date();

		if (mode === "edit" && initialSong) {
			const updatedSong: Song = {
				...initialSong,
				name: values.name.trim(),
				description: values.description.trim(),
				totalDuration: values.totalDuration ?? 0,
				trackLabels: values.trackLabels ?? [],
				updatedAt: timestamp,
			};

			onCallbackSubmit(updatedSong);
		} else {
			const newSong: Song = {
				id: Date.now(),
				name: values.name.trim(),
				description: values.description.trim(),
				trackLabels: values.trackLabels ?? [],
				totalDuration: values.totalDuration ?? 0,
				notes: [],
				tags: [],
				createdAt: timestamp,
				updatedAt: timestamp,
			};

			onCallbackSubmit(newSong);
		}

		reset(DEFAULT_VALUES);
		onClose();
	});

	// ---- EFFECTS ----

	useEffect(() => {
		if (mode === "edit" && initialSong) {
			reset({
				name: initialSong.name ?? "",
				description: initialSong.description ?? "",
				totalDuration: initialSong.totalDuration ?? 0,
				trackLabels: initialSong.trackLabels ?? [],
			});
		} else if (mode === "create") {
			reset(DEFAULT_VALUES);
		}
	}, [initialSong, mode, reset]);

	return {
		form,
		trackLabelOptions,
		handleSubmit: submitForm,
	};
}
