import { useEffect, useState } from "react";
import type { Song } from "../../../types/song.types";
import { StorageKey } from "../../../enums/common.enum";

export function useSongPage() {
	const [songs, setSongs] = useState<Song[]>([]);
	const [loading, setLoading] = useState(true);

	async function loadSongs() {
		const cached = localStorage.getItem(StorageKey.CACHED_SONGS);
		if (cached) {
			setSongs(JSON.parse(cached));
			setLoading(false);
			return;
		}

		try {
			const res = await fetch("/src/data/sample-songs.json");
			const data: Song[] = await res.json();
			setSongs(data);
			localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(data));
		} catch {
			setSongs([]);
		} finally {
			setLoading(false);
		}
	}

	function onCreateSong(song: Song) {
		setSongs((prevSongs) => {
			const updatedSongs = [...prevSongs, song];
			localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(updatedSongs));
			return updatedSongs;
		});
	}

	function onUpdateSong(index: number, song: Song) {
		setSongs((prevSongs) => {
			if (index < 0 || index >= prevSongs.length) {
				return prevSongs;
			}

			const updatedSongs = [...prevSongs];
			const existingSong = prevSongs[index];

			updatedSongs[index] = {
				...existingSong,
				...song,
			};

			localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(updatedSongs));
			return updatedSongs;
		});
	}

	function onDeleteSong(index: number) {
		setSongs((prevSongs) => {
			const updatedSongs = prevSongs.filter((_, songIndex) => songIndex !== index);
			localStorage.setItem(StorageKey.CACHED_SONGS, JSON.stringify(updatedSongs));
			return updatedSongs;
		});
	}

	useEffect(() => {
		loadSongs();
	}, []);

	return { songs, loading, onCreateSong, onUpdateSong, onDeleteSong };
}
