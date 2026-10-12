import { formatTime } from '../api'
import { PlayIcon, PauseIcon, PrevIcon, NextIcon, ShuffleIcon, RepeatIcon, VolumeIcon, MuteIcon } from './Icons'

export default function Player({
  isPlaying, time, volume, muted, shuffle, repeat,
  onToggle, onNext, onPrev, onSeek, onVolume, onMute, onShuffle, onRepeat,
}) {
  const duration = time.duration || 0
  const pct = duration ? (time.current / duration) * 100 : 0

  return (
    <section className="player" aria-label="Player controls">
      <div className="time-control">
        <span>{formatTime(time.current)}</span>
        <input
          type="range"
          className="seek"
          min={0}
          max={duration}
          step="0.1"
          value={Math.min(time.current, duration)}
          onChange={(e) => onSeek(Number(e.target.value))}
          style={{ '--pct': `${pct}%` }}
          aria-label="Seek"
        />
        <span>{formatTime(duration)}</span>
      </div>

      <div className="play-control">
        <button className={`icon-btn small ${shuffle ? 'on' : ''}`} onClick={onShuffle} aria-pressed={shuffle} aria-label="Shuffle">
          <ShuffleIcon size={20} />
        </button>
        <button className="icon-btn" onClick={onPrev} aria-label="Previous track">
          <PrevIcon size={28} />
        </button>
        <button className="icon-btn play" onClick={onToggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
        </button>
        <button className="icon-btn" onClick={onNext} aria-label="Next track">
          <NextIcon size={28} />
        </button>
        <button className={`icon-btn small ${repeat ? 'on' : ''}`} onClick={onRepeat} aria-pressed={repeat} aria-label="Repeat track">
          <RepeatIcon size={20} />
        </button>
      </div>

      <div className="volume">
        <button className="icon-btn small" onClick={onMute} aria-label={muted ? 'Unmute' : 'Mute'}>
          {muted || volume === 0 ? <MuteIcon size={18} /> : <VolumeIcon size={18} />}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step="0.01"
          value={muted ? 0 : volume}
          onChange={(e) => onVolume(Number(e.target.value))}
          style={{ '--pct': `${(muted ? 0 : volume) * 100}%` }}
          aria-label="Volume"
        />
      </div>
    </section>
  )
}
