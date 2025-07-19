import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const FAV_KEY = 'litttleSingyFavourites';

interface HomeProps {
  search?: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const DEFAULT_QUERY = 'nursery rhymes';

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
        const q = search && search.trim() ? search : DEFAULT_QUERY;
        const resp = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent(q)}&key=${API_KEY}`
        );
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
      updated = [...favourites, { id: video.id, title: video.title, thumbnail: video.thumbnail }];
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {videos.map((video) => (
            <div
              key={video.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                background: '#fff',
                borderRadius: 8,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                padding: 8,
                border: selectedVideo === video.id ? '2px solid #ff4081' : '2px solid transparent',
              }}
              onClick={() => setSelectedVideo(video.id)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 6, marginRight: 12 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{video.title}</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 4, maxHeight: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {video.description}
                </div>
                <button
                  style={{ marginTop: 8, color: isFavourite(video.id) ? '#ff4081' : '#888', background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={e => { e.stopPropagation(); toggleFavourite(video); }}
                >
                  {isFavourite(video.id) ? 'Remove from Favourites' : 'Add to Favourites'}
                </button>
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