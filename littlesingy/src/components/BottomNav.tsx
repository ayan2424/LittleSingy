import React from 'react';
import './BottomNav.css';

type NavItem = {
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { label: 'Home', icon: '🏠' },
  { label: 'Playlist', icon: '🎵' },
  { label: 'Favourite', icon: '❤️' },
  { label: 'Setting', icon: '⚙️' },
];

const BottomNav: React.FC<{ current: string; onChange: (label: string) => void }> = ({ current, onChange }) => {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.label}
          className={`bottom-nav-item${current === item.label ? ' active' : ''}`}
          onClick={() => onChange(item.label)}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;