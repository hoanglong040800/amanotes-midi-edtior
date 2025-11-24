export type CreateNoteInput = {
	track: number;
	time: number;
	title: string;
	description?: string;
	color: string;
	songId: string;
};

export type UpdateNoteInput = {
	track?: number;
	time?: number;
	title?: string;
	description?: string;
	color?: string;
};

