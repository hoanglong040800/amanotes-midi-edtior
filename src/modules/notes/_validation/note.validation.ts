import * as yup from "yup";

const NUMBER_TRANSFORM = (value: unknown, originalValue: unknown) => {
	if (typeof originalValue === "string" && originalValue.trim() === "") {
		return undefined;
	}

	return Number.isNaN(value) ? undefined : value;
};

export function createNoteFormSchema(maxDuration: number) {
	const safeDuration = Number.isFinite(maxDuration) && maxDuration > 0 ? maxDuration : 0;

	return yup.object({
		track: yup
			.number()
			.transform(NUMBER_TRANSFORM)
			.typeError("Track is required")
			.min(1, "Track must be between 1 and 8")
			.max(8, "Track must be between 1 and 8")
			.required("Track is required"),
		time: yup
			.number()
			.transform(NUMBER_TRANSFORM)
			.typeError("Time is required")
			.min(0, "Time must be 0 or greater")
			.max(safeDuration, `Time must be ${safeDuration}s or less`)
			.required("Time is required"),
		title: yup.string().trim().required("Title is required"),
		description: yup.string().trim().default(""),
		color: yup.string().trim().required("Color is required"),
	});
}


