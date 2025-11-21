import './SongMetadata.scss';
import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Song } from '../../../../types/song.types';

export interface SongMetadataProps {
  song: Song;
}

const SongMetadata: React.FC<SongMetadataProps> = ({ song }) => (
  <Stack direction="row" spacing={3} className="song-metadata">
    <Typography variant="caption">Duration: {song.totalDuration}s</Typography>
    <Typography variant="caption">Tracks: {song.trackLabels.length}</Typography>
    <Typography variant="caption">Notes: {song.notes.length}</Typography>
  </Stack>
);

export default SongMetadata;
