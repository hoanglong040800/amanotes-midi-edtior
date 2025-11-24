import { TrackType } from "../enums/track.enum";
import type { Note } from "../types";

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

export type GetAllSongs = Songs[];

export type GetSongWithNotes = Song & {
	notes: Note[];
};
