import React, { useEffect, useState } from 'react';

const FAV_KEY = 'litttleSingyFavourites';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const Favourite: React.FC = () => {
  const [favourites, setFavourites] = useState<Video[]>([]);

  useEffect(() => {
    const favs = localStorage.getItem(FAV_KEY);
    if (favs) setFavourites(JSON.parse(favs));
  }, []);

  const removeFavourite = (id: string) => {
    const updated = favourites.filter((v) => v.id !== id);
    setFavourites(updated);
    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '1rem', paddingBottom: '70px' }}>
      <h2>Favourite</h2>
      <p>Your favourite nursery rhymes will appear here.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 20 }}>
        {favourites.length === 0 && <p>No favourites yet.</p>}
        {favourites.map((video) => (
          <div
            key={video.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              background: '#fff',
              borderRadius: 8,
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              padding: 8,
            }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 6, marginRight: 12 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{video.title}</div>
              <button
                style={{ marginTop: 8, color: '#ff4081', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => removeFavourite(video.id)}
              >
                Remove from Favourites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourite;