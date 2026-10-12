import Cover from './Cover'

export default function Song({ song, isPlaying }) {
  return (
    <section className="song" aria-live="polite">
      <div className={`disc ${isPlaying ? 'spinning' : ''}`}>
        <Cover srcs={song.cover} alt={`${song.name} cover art`} width="480" height="480" />
      </div>
      <h2 title={song.name}>{song.name}</h2>
      <h3>
        <a href={song.link} target="_blank" rel="noreferrer">{song.artist}</a>
      </h3>
    </section>
  )
}
