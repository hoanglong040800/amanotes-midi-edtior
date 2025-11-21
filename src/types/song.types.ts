export type Note = {
	track: number;
	time: number;
	title: string;
	description?: string;
	color: string;
};

export type TrackType = "Kick" | "Snare" | "Hi-Hat" | "Crash" | "Ride" | "Tom 1" | "Tom 2" | "Tambourine" | "Pad" | "Arp" | "FX";

export type Song = {
	name: string;
	description: string;
	totalDuration: number;
	trackLabels: TrackType[];
	notes: Note[];
};
