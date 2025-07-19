import React from 'react';
import logo from '../logo.svg';
import './TopBar.css';

interface TopBarProps {
  onSearchChange?: (value: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ onSearchChange }) => {
  return (
    <div className="top-bar">
      <img src={logo} alt="LitttleSingy Logo" className="top-bar-logo" />
      <input
        type="text"
        className="top-bar-search"
        placeholder="Search nursery rhymes..."
        onChange={e => onSearchChange && onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default TopBar;