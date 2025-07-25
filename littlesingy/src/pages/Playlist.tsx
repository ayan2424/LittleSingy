import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const DEFAULT_QUERY = 'nursery rhymes';

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
        const q = search && search.trim() ? search : DEFAULT_QUERY;
        const resp = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&maxResults=8&q=${encodeURIComponent(q)}&key=${API_KEY}`
        );
        if (!resp.ok) throw new Error('Failed to fetch playlists');
        const data = await resp.json();
        setPlaylists(
          data.items.map((item: any) => ({
            id: item.id.playlistId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium.url,
          }))
        );
        setSelectedPlaylist(data.items[0]?.id.playlistId || null);
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                padding: 8,
                border: selectedPlaylist === playlist.id ? '2px solid #ff4081' : '2px solid transparent',
              }}
              onClick={() => setSelectedPlaylist(playlist.id)}
            >
              <img
                src={playlist.thumbnail}
                alt={playlist.title}
                style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 6, marginRight: 12 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{playlist.title}</div>
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