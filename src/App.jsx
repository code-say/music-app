import { useCallback, useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library'
import { fetchTracks, GENRES } from './api'

export default function App() {
  const audioRef = useRef(null)
  const errorStreak = useRef(0)
  const [genre, setGenre] = useState(GENRES[0])
  const [songs, setSongs] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [reloadKey, setReloadKey] = useState(0)
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [time, setTime] = useState({ current: 0, duration: 0 })
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [libraryOpen, setLibraryOpen] = useState(false)

  const current = songs[index]

  // Load tracks whenever the genre changes
  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetchTracks(genre)
      .then((list) => {
        if (cancelled) return
        if (!list.length) throw new Error('No tracks found')
        audioRef.current?.pause()
        setIsPlaying(false)
        setSongs(list)
        setIndex(0)
        setTime({ current: 0, duration: list[0].duration })
        setStatus('ready')
      })
      .catch(() => !cancelled && setStatus('error'))
    return () => { cancelled = true }
  }, [genre, reloadKey])

  // When the track changes while playing, keep playing
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !current) return
    setTime({ current: 0, duration: current.duration })
    if (isPlaying) audio.play().catch(() => setIsPlaying(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.id])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.muted = muted
    }
  }, [volume, muted])

  const play = useCallback(() => {
    audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => (isPlaying ? pause() : play()), [isPlaying, play, pause])

  const next = useCallback(() => {
    if (!songs.length) return
    if (shuffle && songs.length > 1) {
      let r = index
      while (r === index) r = Math.floor(Math.random() * songs.length)
      setIndex(r)
    } else {
      setIndex((i) => (i + 1) % songs.length)
    }
  }, [songs.length, shuffle, index])

  const prev = useCallback(() => {
    const audio = audioRef.current
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    if (songs.length) setIndex((i) => (i - 1 + songs.length) % songs.length)
  }, [songs.length])

  const seek = useCallback((t) => {
    if (audioRef.current) audioRef.current.currentTime = t
    setTime((s) => ({ ...s, current: t }))
  }, [])

  const selectSong = (i) => {
    if (i === index) return togglePlay()
    setIndex(i)
    if (!isPlaying) {
      // user gesture: start playback of the newly picked song
      setIsPlaying(true)
    }
  }

  // Start playback after a library pick when we were paused
  useEffect(() => {
    if (isPlaying && audioRef.current?.paused && current) {
      audioRef.current.play().catch(() => setIsPlaying(false))
    }
  }, [isPlaying, current])

  const onEnded = () => {
    if (repeat) {
      seek(0)
      play()
    } else {
      next()
    }
  }

  // Keyboard shortcuts: Space play/pause, ←/→ seek 5s, Shift+←/→ prev/next, L library
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') { e.preventDefault(); togglePlay() }
      else if (e.key === 'ArrowRight') e.shiftKey ? next() : seek(Math.min((audioRef.current?.currentTime || 0) + 5, time.duration))
      else if (e.key === 'ArrowLeft') e.shiftKey ? prev() : seek(Math.max((audioRef.current?.currentTime || 0) - 5, 0))
      else if (e.key.toLowerCase() === 'l') setLibraryOpen((o) => !o)
      else if (e.key === 'Escape') setLibraryOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [togglePlay, next, prev, seek, time.duration])

  // Lock-screen / headset controls + tab title
  useEffect(() => {
    if (!current) return
    document.title = isPlaying ? `▶ ${current.name} · ${current.artist}` : 'Waves · Music Player'
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: current.name,
        artist: current.artist,
        artwork: [{ src: current.cover, sizes: '480x480', type: 'image/jpeg' }],
      })
      navigator.mediaSession.setActionHandler('play', play)
      navigator.mediaSession.setActionHandler('pause', pause)
      navigator.mediaSession.setActionHandler('nexttrack', next)
      navigator.mediaSession.setActionHandler('previoustrack', prev)
    }
  }, [current, isPlaying, play, pause, next, prev])

  return (
    <div className={`app ${libraryOpen ? 'library-active' : ''}`}>
      <div className="backdrop" style={current ? { backgroundImage: `url(${current.cover})` } : undefined} aria-hidden="true" />

      <Nav libraryOpen={libraryOpen} onToggle={() => setLibraryOpen((o) => !o)} />

      <main className="stage">
        {status === 'loading' && !current && <div className="state"><span className="spinner" />Loading {genre} tracks…</div>}
        {status === 'error' && (
          <div className="state">
            <p>Couldn’t reach the music service.</p>
            <button className="btn" onClick={() => setReloadKey((k) => k + 1)}>Try again</button>
          </div>
        )}
        {current && status !== 'error' && (
          <>
            <Song song={current} isPlaying={isPlaying} />
            <Player
              isPlaying={isPlaying}
              time={time}
              volume={volume}
              muted={muted}
              shuffle={shuffle}
              repeat={repeat}
              onToggle={togglePlay}
              onNext={next}
              onPrev={prev}
              onSeek={seek}
              onVolume={(v) => { setVolume(v); setMuted(v === 0) }}
              onMute={() => setMuted((m) => !m)}
              onShuffle={() => setShuffle((s) => !s)}
              onRepeat={() => setRepeat((r) => !r)}
            />
          </>
        )}
      </main>

      <Library
        open={libraryOpen}
        onClose={() => setLibraryOpen(false)}
        songs={songs}
        index={index}
        isPlaying={isPlaying}
        onSelect={selectSong}
        genre={genre}
        onGenre={setGenre}
        loading={status === 'loading'}
      />

      <footer className="credit">
        Music streamed from <a href="https://audius.co" target="_blank" rel="noreferrer">Audius</a> ·{' '}
        built by <a href="https://github.com/code-say" target="_blank" rel="noreferrer">Sayan Mandal</a>
      </footer>

      {current && (
        <audio
          ref={audioRef}
          src={current.audio}
          preload="metadata"
          onTimeUpdate={(e) => {
            const { currentTime, duration } = e.currentTarget
            setTime({ current: currentTime, duration: Number.isFinite(duration) ? duration : current.duration })
          }}
          onLoadedMetadata={(e) => {
            const { duration } = e.currentTarget
            setTime((t) => ({ ...t, duration: Number.isFinite(duration) ? duration : current.duration }))
          }}
          onEnded={onEnded}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPlaying={() => { errorStreak.current = 0 }}
          onError={() => {
            // a dead stream: skip ahead, but stop after a few failures in a row
            if (isPlaying && errorStreak.current < 3) { errorStreak.current += 1; next() }
            else setIsPlaying(false)
          }}
        />
      )}
    </div>
  )
}
