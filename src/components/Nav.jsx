import { MusicIcon } from './Icons'

export default function Nav({ libraryOpen, onToggle }) {
  return (
    <nav className="nav">
      <h1 className="brand">
        <span className="wave" aria-hidden="true"><i /><i /><i /><i /></span>
        Waves
      </h1>
      <button className="btn" onClick={onToggle} aria-expanded={libraryOpen} aria-controls="library">
        Library <MusicIcon size={16} />
      </button>
    </nav>
  )
}
