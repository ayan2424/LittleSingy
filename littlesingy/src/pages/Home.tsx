import React from 'react';
import YouTube from 'react-youtube';

const Home: React.FC = () => (
  <div style={{ padding: '1rem', paddingBottom: '70px' }}>
    <h2>Welcome to LitttleSingy!</h2>
    <p>Discover and enjoy nursery rhymes videos.</p>
    <div style={{ maxWidth: 480, margin: '1rem auto' }}>
      <YouTube videoId="CevxZvSJLk8" opts={{ width: '100%', height: '270' }} />
    </div>
  </div>
);

export default Home;