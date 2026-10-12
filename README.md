# Waves · Music Player

A responsive music player built with **React 18** and **Vite** that streams live tracks from the open [Audius](https://audius.co) music API.

**Live:** https://music-app-code-say.vercel.app
![Uploading image.png…]()


## Features

- Live library of trending **Lo-Fi, Ambient, Jazz and Electronic** tracks (Audius API — no API key needed)
- Play / pause, previous / next, seek, volume and mute
- Shuffle and repeat-one, and auto-play of the next track when a song ends
- Slide-out library with genre tabs and a "now playing" indicator
- Spinning vinyl cover with a blurred album-art backdrop
- Keyboard shortcuts: `Space` play/pause, `←`/`→` seek 5s, `Shift+←/→` previous/next, `L` library, `Esc` close
- Lock-screen and headset controls via the Media Session API
- Loading and error states with retry, reduced-motion support

## What changed in v2 (2026)

The original version streamed songs and cover art from Chillhop URLs that have since gone offline, so nothing played, and it was built on Create React App 4 with `node-sass`, which no longer builds on current Node.js. v2:

- Replaced the hard-coded Chillhop list with live tracks from the Audius API
- Migrated from CRA + node-sass to **Vite 6** + plain CSS, React 17 → 18
- Removed Font Awesome (inline SVG icons), `uuid`, `nodemon` and test boilerplate
- Fixed the library "active song" bug (selection never highlighted) and the stale-state `playAudio` workaround
- Added shuffle, repeat, volume, auto-next, genres, keyboard and media controls
- Added `vercel.json`

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

```
src/
  api.js              Audius fetch + time formatting
  App.jsx             player state and audio element
  components/
    Nav.jsx  Song.jsx  Player.jsx  Library.jsx  Icons.jsx
  styles.css
```

Music is provided by Audius and its artists; each track links back to its Audius page.
