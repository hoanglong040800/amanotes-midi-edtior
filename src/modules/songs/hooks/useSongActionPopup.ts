import { useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Song, TrackType } from "../../../types/song.types";

type UseSongActionPopupParams = {
	onClose: () => void;
	onCallbackSubmit: (song: Song) => void;
};

export type SongActionFormValues = {
	name: string;
	description: string;
	trackLabels: TrackType[];
};

const TRACK_LABEL_OPTIONS: TrackType[] = [
	"Kick",
	"Snare",
	"Hi-Hat",
	"Crash",
	"Ride",
	"Tom 1",
	"Tom 2",
	"Tambourine",
	"Pad",
	"Arp",
	"FX",
];

const SONG_FORM_SCHEMA = yup.object({
	name: yup.string().trim().required("Name is required"),
	description: yup.string().trim().required("Description is required"),
	trackLabels: yup.array().of(yup.mixed<TrackType>().oneOf(TRACK_LABEL_OPTIONS)).default([]),
});

const DEFAULT_VALUES: SongActionFormValues = {
	name: "",
	description: "",
	trackLabels: [],
};

export function useSongActionPopup({ onClose, onCallbackSubmit }: UseSongActionPopupParams) {
	const form = useForm<SongActionFormValues>({
		defaultValues: DEFAULT_VALUES,
		resolver: yupResolver(SONG_FORM_SCHEMA) as Resolver<SongActionFormValues>,
	});

	const { handleSubmit, reset } = form;

	const trackLabelOptions = TRACK_LABEL_OPTIONS;

	const submitForm = handleSubmit((values) => {
		const newSong: Song = {
			name: values.name.trim(),
			description: values.description.trim(),
			trackLabels: values.trackLabels ?? [],
			totalDuration: 0,
			notes: [],
		};

		onCallbackSubmit(newSong);
		reset(DEFAULT_VALUES);
		onClose();
	});

	return {
		form,
		trackLabelOptions,
		handleSubmit: submitForm,
	};
}
