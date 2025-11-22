import { TrackType } from "../enums/track.enum";

export type Note = {
	track: number; // from 1 - 8
	time: number;
	title: string;
	description?: string;
	color: string;
	createdAt: Date;
	updatedAt: Date;
};

export type Song = {
	name: string;
	description: string;
	totalDuration: number; // in seconds
	trackLabels: TrackType[];
	notes: Note[];
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
};
