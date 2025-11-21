import './SongListHeader.scss';
import React from 'react';
import Container from '@mui/material/Container';

const SongListHeader: React.FC = () => (
  <Container className="song-list-header" maxWidth="md">
    <h1>Song/Sequence Management</h1>
  </Container>
);

export default SongListHeader;
