export type Note = {
	track: number;
	time: number;
	title: string;
	description?: string;
	color: string;
};

export type Song = {
	name: string;
	description: string;
	totalDuration: number;
	trackLabels: string[];
	notes: Note[];
};
