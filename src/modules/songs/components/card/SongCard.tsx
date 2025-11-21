import './SongCard.scss';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { Song } from '../../../../types/song.types';

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => (
  <Card className="song-card" variant="outlined">
    <CardContent>
      <Typography variant="h6" className="song-card-title">{song.name}</Typography>
      <Typography variant="body2" color="text.secondary">{song.description}</Typography>
    </CardContent>
  </Card>
);

export default SongCard;
