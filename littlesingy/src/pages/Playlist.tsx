import React from 'react';
import YouTube from 'react-youtube';

const PLAYLIST_ID = 'PL55713C70BA91BD6E'; // Example playlist

interface PlaylistProps {
  search?: string;
}

const Playlist: React.FC<PlaylistProps> = ({ search }) => (
  <div style={{ padding: '1rem', paddingBottom: '70px' }}>
    <h2>Playlist</h2>
    <p>Your nursery rhymes playlists will appear here.</p>
    {/* TODO: Fetch playlists from YouTube Data API and render dynamically, filter by search */}
    <div style={{ maxWidth: 480, margin: '1rem auto' }}>
      <YouTube
        videoId=""
        opts={{
          width: '100%',
          height: '270',
          playerVars: {
            listType: 'playlist',
            list: PLAYLIST_ID,
          },
        }}
      />
    </div>
  </div>
);

export default Playlist;