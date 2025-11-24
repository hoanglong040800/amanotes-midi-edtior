import type { Song } from "../types/song.types";
import type { CreateSongInput, GetSongWithNotes, UpdateSongInput } from "../dto/song.dto";
import { StorageKey } from "../../enums/common.enum";
import { NoteApi } from "./note.api";
import { v4 as uuidv4 } from "uuid";

const SAMPLE_SONGS_URL = "/src/backend/data/sample-songs.json";

export const SongApi = {
	fetchSongs,
	fetchSongById,
	createSong,
	updateSong,
	deleteSong,
};

async function _fetchSongsFromRemote(): Promise<Song[]> {
	const response = await fetch(SAMPLE_SONGS_URL);
	if (!response.ok) {
		throw new Error("Failed to load songs.");
	}

	const data = (await response.json()) as Song[];

	await _saveSongsToLocalStorage(data);

	return data;
}

async function fetchSongs(): Promise<Song[]> {
	const cached = localStorage.getItem(StorageKey.CACHED_SONGS);

	if (cached) {
		return JSON.parse(cached) as Song[];
	}

	return await _fetchSongsFromRemote();
}

async function fetchSongById(id: string): Promise<GetSongWithNotes | null> {
	const allSongs = await fetchSongs();
	const notesBySongId = await NoteApi.fetchNotesBySongId(id);

	const song = allSongs.find((song) => song.id === id) ?? null;

	if (!song) {
		return null;
	}

	return {
		...song,
		notes: notesBySongId,
	};
}

async function _saveSongsToLocalStorage(songs: Song[]): Promise<void> {
	localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(songs));
}

async function createSong(input: CreateSongInput): Promise<Song> {
	const songs = await fetchSongs();
	const timestamp = new Date();

	const newSong: Song = {
		id: uuidv4(),
		name: input.name,
		description: input.description,
		totalDuration: input.totalDuration,
		trackLabels: input.trackLabels,
		tags: input.tags ?? [],
		createdAt: timestamp,
		updatedAt: timestamp,
	};

	const updatedSongs = [...songs, newSong];
	await _saveSongsToLocalStorage(updatedSongs);

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

	await _saveSongsToLocalStorage(updatedSongs);

	return updatedSong;
}

async function deleteSong(songId: string): Promise<void> {
	const songs = await fetchSongs();
	const updatedSongs = songs.filter((song) => song.id !== songId);

	await _saveSongsToLocalStorage(updatedSongs);
}
