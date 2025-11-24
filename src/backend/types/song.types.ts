import { TrackType } from "../enums/track.enum";

export type Note = {
	id: string;
	track: number; // from 1 - 8
	time: number;
	title: string;
	description?: string;
	color: string;
	createdAt: Date;
	updatedAt: Date;
	song: {
		id: string;
	}
};

export type Song = {
	id: string;
	name: string;
	description: string;
	totalDuration: number; // in seconds
	trackLabels: TrackType[];
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
};
