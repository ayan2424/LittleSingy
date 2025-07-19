import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCCTZzD9FrSGepKYiA2UNh1w';

interface PlaylistProps {
  search?: string;
}

interface PlaylistItem {
  id: string;
  title: string;
  thumbnail: string;
}

const Playlist: React.FC<PlaylistProps> = ({ search }) => {
  const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=8&channelId=${CHANNEL_ID}&key=${API_KEY}`;
        if (search && search.trim()) {
          // Playlists API does not support search, so filter client-side
        }
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Failed to fetch playlists');
        const data = await resp.json();
        let items = data.items.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
        }));
        if (search && search.trim()) {
          items = items.filter((item: PlaylistItem) => item.title.toLowerCase().includes(search.toLowerCase()));
        }
        setPlaylists(items);
        setSelectedPlaylist(items[0]?.id || null);
      } catch (e: any) {
        setError(e.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, [search]);

  return (
    <div style={{ padding: '1rem', paddingBottom: '70px' }}>
      <h2>Playlist</h2>
      <p>Your nursery rhymes playlists will appear here.</p>
      {loading && <p>Loading playlists...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && selectedPlaylist && (
        <div style={{ maxWidth: 480, margin: '1rem auto' }}>
          <YouTube
            videoId=""
            opts={{
              width: '100%',
              height: '270',
              playerVars: {
                listType: 'playlist',
                list: selectedPlaylist,
              },
            }}
          />
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <h3>Playlists</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                overflow: 'hidden',
                border: selectedPlaylist === playlist.id ? '2px solid #ff4081' : '2px solid transparent',
                transition: 'box-shadow 0.2s, border 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 220,
                position: 'relative',
              }}
              onClick={() => setSelectedPlaylist(playlist.id)}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, lineHeight: 1.2 }}>{playlist.title}</div>
              </div>
            </div>
          ))}
        </div>
        {!loading && !error && playlists.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
};

export default Playlist;