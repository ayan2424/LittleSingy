import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

interface HomeProps {
  search?: string;
}

interface Video {
  id: string;
  title: string;
}

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const DEFAULT_QUERY = 'nursery rhymes';

const Home: React.FC<HomeProps> = ({ search }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = search && search.trim() ? search : DEFAULT_QUERY;
        const resp = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(q)}&key=${API_KEY}`
        );
        if (!resp.ok) throw new Error('Failed to fetch videos');
        const data = await resp.json();
        setVideos(
          data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
          }))
        );
      } catch (e: any) {
        setError(e.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [search]);

  return (
    <div style={{ padding: '1rem', paddingBottom: '70px' }}>
      <h2>Welcome to LitttleSingy!</h2>
      <p>Discover and enjoy nursery rhymes videos.</p>
      {loading && <p>Loading videos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && videos.length > 0 && (
        <div style={{ maxWidth: 480, margin: '1rem auto' }}>
          <YouTube videoId={videos[0].id} opts={{ width: '100%', height: '270' }} />
        </div>
      )}
      <div style={{ marginTop: '2rem' }}>
        <h3>Popular Rhymes</h3>
        <ul>
          {videos.map((video) => (
            <li key={video.id}>{video.title}</li>
          ))}
        </ul>
        {!loading && !error && videos.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
};

export default Home;