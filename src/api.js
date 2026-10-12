// Audius is an open music API: no key needed, CORS enabled, streams real audio.
// Docs: https://docs.audius.org/developers/api
const APP_NAME = 'waves-music-player'
const FALLBACK_HOST = 'https://api.audius.co'

export const GENRES = ['Lo-Fi', 'Ambient', 'Jazz', 'Electronic']

let hostsPromise = null

// api.audius.co is the main gateway; the hosts it lists are backups if it hiccups.
function getHosts() {
  if (!hostsPromise) {
    hostsPromise = fetch(FALLBACK_HOST)
      .then((r) => r.json())
      .then((j) => [FALLBACK_HOST, ...(Array.isArray(j.data) ? j.data : [])])
      .then((list) => [...new Set(list)].slice(0, 4))
      .catch(() => [FALLBACK_HOST])
  }
  return hostsPromise
}

export async function fetchTracks(genre, limit = 25) {
  const hosts = await getHosts()
  let data = null
  let host = FALLBACK_HOST
  for (const h of hosts) {
    try {
      const url = `${h}/v1/tracks/trending?genre=${encodeURIComponent(genre)}&time=month&app_name=${APP_NAME}`
      const res = await fetch(url)
      if (!res.ok) continue
      data = (await res.json()).data || []
      host = h
      break
    } catch {
      // try the next host
    }
  }
  if (!data) throw new Error('Audius unavailable')

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
