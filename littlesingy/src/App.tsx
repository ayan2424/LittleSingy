import React, { useState } from 'react';
import './App.css';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Favourite from './pages/Favourite';
import Setting from './pages/Setting';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const [search, setSearch] = useState('');

  let PageComponent;
  switch (currentPage) {
    case 'Playlist':
      PageComponent = Playlist;
      break;
    case 'Favourite':
      PageComponent = Favourite;
      break;
    case 'Setting':
      PageComponent = Setting;
      break;
    case 'Home':
    default:
      PageComponent = Home;
  }

  return (
    <div className="App">
      <TopBar onSearchChange={setSearch} />
      <div style={{ marginTop: 60, marginBottom: 70 }}>
        <PageComponent search={search} />
      </div>
      <BottomNav current={currentPage} onChange={setCurrentPage} />
    </div>
  );
}

export default App;
