import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TrackType } from "../../../enums/track.enum";
import type { Song } from "../../../types/song.types";

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

const buildTrackLabelOptions = () => {
	const options: TrackType[] = [];

	for (const key in TrackType) {
		options.push(TrackType[key as keyof typeof TrackType]);
	}

	return options;
};

const TRACK_LABEL_OPTIONS = buildTrackLabelOptions();

const NUMBER_TRANSFORM = (value: unknown, originalValue: unknown) => {
	if (typeof originalValue === "string" && originalValue.trim() === "") {
		return undefined;
	}

	return Number.isNaN(value) ? undefined : value;
};

const SONG_FORM_SCHEMA = yup.object({
	name: yup.string().trim().required("Name is required"),
	description: yup.string().trim().required("Description is required"),
	totalDuration: yup
		.number()
		.transform(NUMBER_TRANSFORM)
		.typeError("Duration is required")
		.min(0, "Duration must be 0 or greater")
		.required("Duration is required"),
	trackLabels: yup.array().of(yup.mixed<TrackType>().oneOf(TRACK_LABEL_OPTIONS)).default([]),
});

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

	return {
		form,
		trackLabelOptions,
		handleSubmit: submitForm,
	};
}
