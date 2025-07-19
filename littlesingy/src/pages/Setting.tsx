import React from 'react';

const FAV_KEY = 'litttleSingyFavourites';

const Setting: React.FC = () => {
  const clearFavourites = () => {
    localStorage.removeItem(FAV_KEY);
    window.location.reload();
  };

  return (
    <div style={{ padding: '1rem', paddingBottom: '70px' }}>
      <h2>Settings</h2>
      <p>App settings and preferences.</p>
      <button
        style={{ marginTop: 20, color: '#fff', background: '#ff4081', border: 'none', borderRadius: 6, padding: '10px 20px', cursor: 'pointer' }}
        onClick={clearFavourites}
      >
        Clear All Favourites
      </button>
    </div>
  );
};

export default Setting;