import React from 'react';
import YouTube from 'react-youtube';

const sampleVideos = [
  { id: 'CevxZvSJLk8', title: 'Twinkle Twinkle Little Star' },
  { id: 'k9uOtYGLhHo', title: 'Baa Baa Black Sheep' },
  { id: 'e4dT8FJ2GE0', title: 'Wheels on the Bus' },
];

interface HomeProps {
  search?: string;
}

const Home: React.FC<HomeProps> = ({ search }) => {
  const filtered = search
    ? sampleVideos.filter(v => v.title.toLowerCase().includes(search.toLowerCase()))
    : sampleVideos;
  return (
    <div style={{ padding: '1rem', paddingBottom: '70px' }}>
      <h2>Welcome to LitttleSingy!</h2>
      <p>Discover and enjoy nursery rhymes videos.</p>
      {/* TODO: Fetch videos from YouTube Data API and render dynamically */}
      <div style={{ maxWidth: 480, margin: '1rem auto' }}>
        <YouTube videoId={filtered[0]?.id || ''} opts={{ width: '100%', height: '270' }} />
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h3>Popular Rhymes</h3>
        <ul>
          {filtered.map((video) => (
            <li key={video.id}>{video.title}</li>
          ))}
        </ul>
        {filtered.length === 0 && <p>No results found.</p>}
      </div>
    </div>
  );
};

export default Home;