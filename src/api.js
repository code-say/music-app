// Audius is an open music API: no key needed, CORS enabled, streams real audio.
// Docs: https://docs.audius.org/developers/api
const APP_NAME = 'waves-music-player'
const FALLBACK_HOST = 'https://api.audius.co'

export const GENRES = ['Lo-Fi', 'Ambient', 'Jazz', 'Electronic']

let hostPromise = null

function getHost() {
  if (!hostPromise) {
    hostPromise = fetch(FALLBACK_HOST)
      .then((r) => r.json())
      .then((j) => (Array.isArray(j.data) && j.data.length ? j.data[0] : FALLBACK_HOST))
      .catch(() => FALLBACK_HOST)
  }
  return hostPromise
}

export async function fetchTracks(genre, limit = 25) {
  const host = await getHost()
  const url = `${host}/v1/tracks/trending?genre=${encodeURIComponent(genre)}&time=month&app_name=${APP_NAME}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Audius returned ${res.status}`)
  const { data = [] } = await res.json()

  return data
    .filter((t) => t.is_streamable !== false && t.artwork && t.duration > 30)
    .slice(0, limit)
    .map((t) => ({
      id: t.id,
      name: t.title,
      artist: t.user?.name ?? 'Unknown artist',
      cover: t.artwork['480x480'] || t.artwork['150x150'],
      thumb: t.artwork['150x150'] || t.artwork['480x480'],
      duration: t.duration,
      audio: `${host}/v1/tracks/${t.id}/stream?app_name=${APP_NAME}`,
      link: t.permalink ? `https://audius.co${t.permalink}` : 'https://audius.co',
    }))
}

export const formatTime = (sec) => {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}
