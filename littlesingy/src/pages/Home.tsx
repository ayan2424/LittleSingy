import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const FAV_KEY = 'litttleSingyFavourites';
const CHANNEL_ID = 'UCCTZzD9FrSGepKYiA2UNh1w';

interface HomeProps {
  search?: string;
}

interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
}

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

const Home: React.FC<HomeProps> = ({ search }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<Video[]>([]);

  useEffect(() => {
    const favs = localStorage.getItem(FAV_KEY);
    if (favs) setFavourites(JSON.parse(favs));
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&channelId=${CHANNEL_ID}&key=${API_KEY}`;
        if (search && search.trim()) {
          url += `&q=${encodeURIComponent(search)}`;
        }
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Failed to fetch videos');
        const data = await resp.json();
        setVideos(
          data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.medium.url,
          }))
        );
        setSelectedVideo(data.items[0]?.id.videoId || null);
      } catch (e: any) {
        setError(e.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [search]);

  const isFavourite = (id: string) => favourites.some((v) => v.id === id);

  const toggleFavourite = (video: Video) => {
    let updated: Video[];
    if (isFavourite(video.id)) {
      updated = favourites.filter((v) => v.id !== video.id);
    } else {
      updated = [...favourites, { id: video.id, title: video.title, thumbnail: video.thumbnail, description: video.description }];
    }
    setFavourites(updated);
    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '1rem', paddingBottom: '70px' }}>
      <h2>Welcome to LitttleSingy!</h2>
      <p>Discover and enjoy nursery rhymes videos.</p>
      {loading && <p>Loading videos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && selectedVideo && (
        <div style={{ maxWidth: 480, margin: '1rem auto' }}>
          <YouTube videoId={selectedVideo} opts={{ width: '100%', height: '270' }} />
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <h3>Popular Rhymes</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                background: '#fff',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                overflow: 'hidden',
                border: selectedVideo === video.id ? '2px solid #ff4081' : '2px solid transparent',
                transition: 'box-shadow 0.2s, border 0.2s',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 240,
                position: 'relative',
              }}
              onClick={() => setSelectedVideo(video.id)}
            >
              <div style={{ position: 'relative' }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
                />
                <button
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    background: isFavourite(video.id) ? '#ff4081' : 'rgba(255,255,255,0.85)',
                    color: isFavourite(video.id) ? '#fff' : '#ff4081',
                    border: 'none',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    fontSize: 20,
                    cursor: 'pointer',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                    zIndex: 2,
                  }}
                  onClick={e => { e.stopPropagation(); toggleFavourite(video); }}
                  title={isFavourite(video.id) ? 'Remove from Favourites' : 'Add to Favourites'}
                >
                  {isFavourite(video.id) ? '♥' : '♡'}
                </button>
              </div>
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, lineHeight: 1.2 }}>{video.title}</div>
                <div style={{ fontSize: 13, color: '#666', maxHeight: 36, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {video.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        {!loading && !error && videos.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
};

export default Home;