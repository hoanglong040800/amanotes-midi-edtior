import { TrackType } from "../enums/track.enum";

export type CreateSongInput = {
	name: string;
	description: string;
	totalDuration: number;
	trackLabels: TrackType[];
	tags?: string[];
};

export type UpdateSongInput = {
	name?: string;
	description?: string;
	totalDuration?: number;
	trackLabels?: TrackType[];
	tags?: string[];
};
