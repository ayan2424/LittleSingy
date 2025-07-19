import React from 'react';
import logo from '../logo.svg';
import './TopBar.css';

const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <img src={logo} alt="LitttleSingy Logo" className="top-bar-logo" />
      <input type="text" className="top-bar-search" placeholder="Search nursery rhymes..." />
    </div>
  );
};

export default TopBar;