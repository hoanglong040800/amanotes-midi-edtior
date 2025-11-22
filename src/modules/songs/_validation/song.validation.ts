import * as yup from "yup";
import type { TrackType } from "../../../enums/track.enum";
import { TRACK_LABEL_OPTIONS } from "../_utils/song.utils";

const NUMBER_TRANSFORM = (value: unknown, originalValue: unknown) => {
	if (typeof originalValue === "string" && originalValue.trim() === "") {
		return undefined;
	}

	return Number.isNaN(value) ? undefined : value;
};

export const SONG_FORM_SCHEMA = yup.object({
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

