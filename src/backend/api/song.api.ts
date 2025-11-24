import type { Song } from "../types/song.types";
import type { CreateSongInput, UpdateSongInput } from "../dto/song.dto";
import { StorageKey } from "../../enums/common.enum";


const SAMPLE_SONGS_URL = "/src/backend/data/sample-songs.json";

export const SongApi = {
	fetchSongsFromRemote,
	fetchSongs,
	fetchSongById,
	createSong,
	updateSong,
	deleteSong,
};

async function fetchSongsFromRemote(): Promise<Song[]> {
	const response = await fetch(SAMPLE_SONGS_URL);
	if (!response.ok) {
		throw new Error("Failed to load songs.");
	}

	const data = (await response.json()) as Song[];

	await saveSongs(data);

	return data;
}

async function fetchSongs(): Promise<Song[]> {
	const cached = localStorage.getItem(StorageKey.CACHED_SONGS);

	if (cached) {
		return JSON.parse(cached) as Song[];
	}

	return await fetchSongsFromRemote();
}

async function fetchSongById(id: string): Promise<Song | null> {
	const songs = await fetchSongs();
	return songs.find((song) => song.id === id) ?? null;
}

async function saveSongs(songs: Song[]): Promise<void> {
	localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(songs));
}

function generateSongId(): string {
	return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

async function createSong(input: CreateSongInput): Promise<Song> {
	const songs = await fetchSongs();
	const timestamp = new Date();

	const newSong: Song = {
		id: generateSongId(),
		name: input.name,
		description: input.description,
		totalDuration: input.totalDuration,
		trackLabels: input.trackLabels,
		notes: [],
		tags: input.tags ?? [],
		createdAt: timestamp,
		updatedAt: timestamp,
	};

	const updatedSongs = [...songs, newSong];
	await saveSongs(updatedSongs);

	return newSong;
}

async function updateSong(songId: string, updates: UpdateSongInput): Promise<Song> {
	const songs = await fetchSongs();
	const songIndex = songs.findIndex((s) => s.id === songId);

	if (songIndex === -1) {
		throw new Error(`Song with id ${songId} not found`);
	}

	const existingSong = songs[songIndex];
	const updatedSong: Song = {
		...existingSong,
		...updates,
		id: existingSong.id,
		createdAt: existingSong.createdAt,
		updatedAt: new Date(),
	};

	const updatedSongs = [...songs];
	updatedSongs[songIndex] = updatedSong;

	await saveSongs(updatedSongs);

	return updatedSong;
}

async function deleteSong(songId: string): Promise<void> {
	const songs = await fetchSongs();
	const updatedSongs = songs.filter((song) => song.id !== songId);

	await saveSongs(updatedSongs);
}
