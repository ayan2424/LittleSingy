# LitttleSingy

LitttleSingy is a nursery rhymes TV app that showcases YouTube videos and playlists for kids. It features:

- Home, Playlist, Favourite, and Setting screens
- Embedded YouTube videos and playlists
- Search bar and app logo in the top bar
- Bottom navigation for easy access to main sections

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and add your YouTube Data API key:
   ```bash
   cp .env.example .env
   # Edit .env and set REACT_APP_YOUTUBE_API_KEY=your_key_here
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Features
- Browse and search for nursery rhymes
- Watch YouTube videos directly in the app
- Manage playlists and favourites
- Responsive design for all devices

---

This project uses [react-youtube](https://github.com/tjallingt/react-youtube) for embedding YouTube content.
