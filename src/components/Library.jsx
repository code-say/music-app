import { GENRES, formatTime } from '../api'
import { CloseIcon } from './Icons'
import Cover from './Cover'

export default function Library({ open, onClose, songs, index, isPlaying, onSelect, genre, onGenre, loading }) {
  return (
    <aside id="library" className={`library ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Library">
      <div className="library-head">
        <h2>Library</h2>
        <button className="icon-btn small" onClick={onClose} aria-label="Close library" tabIndex={open ? 0 : -1}>
          <CloseIcon size={20} />
        </button>
      </div>

      <div className="chips" role="tablist" aria-label="Genre">
        {GENRES.map((g) => (
          <button
            key={g}
            role="tab"
            aria-selected={g === genre}
            className={`chip ${g === genre ? 'active' : ''}`}
            onClick={() => onGenre(g)}
            tabIndex={open ? 0 : -1}
          >
            {g}
          </button>
        ))}
      </div>

      <ul className={`library-songs ${loading ? 'dim' : ''}`}>
        {songs.map((song, i) => (
          <li key={song.id}>
            <button
              className={`library-song ${i === index ? 'selected' : ''}`}
              onClick={() => onSelect(i)}
              tabIndex={open ? 0 : -1}
            >
              <Cover srcs={song.thumb} alt="" width="56" height="56" loading="lazy" />
              <span className="meta">
                <span className="title">{song.name}</span>
                <span className="artist">{song.artist}</span>
              </span>
              <span className="dur">
                {i === index && isPlaying ? (
                  <span className="eq" aria-label="Now playing"><i /><i /><i /></span>
                ) : (
                  formatTime(song.duration)
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
