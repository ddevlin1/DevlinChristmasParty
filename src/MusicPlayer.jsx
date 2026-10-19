import { useEffect, useRef, useState } from 'react'

// Files live in public/Music — keep names in sync with that folder.
const TRACKS = [
  { title: 'Devlin Christmas Cheer', src: '/Music/Devlin Christmas Cheer.mp3' },
  { title: 'Shining Five Years Strong', src: '/Music/Shining Five Years Strong.mp3' },
  { title: 'Shining Five Years Strong (Teen Pop Remix)', src: '/Music/Shining Five Years Strong (Teen Pop Remix).mp3' },
  { title: 'Espresso Nights', src: '/Music/Espresso Nights.mp3' },
  { title: 'Millie the Black Dog', src: '/Music/Millie the Black Dog.mp3' },
]

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [trackIndex, setTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const track = TRACKS[trackIndex]

  const togglePlay = () => setIsPlaying((p) => !p)
  const next = () => setTrackIndex((i) => (i + 1) % TRACKS.length)
  const prev = () => setTrackIndex((i) => (i - 1 + TRACKS.length) % TRACKS.length)
  const selectTrack = (i) => {
    setTrackIndex(i)
    setIsPlaying(true)
  }

  // Try to autoplay when the track changes (a prior user gesture unlocked audio already).
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    setProgress(0)
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [trackIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) audio.play().catch(() => setIsPlaying(false))
    else audio.pause()
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', next)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', next)
    }
  }) // no deps — always re-attach so `next` closes over latest trackIndex

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    audio.currentTime = ratio * audio.duration
    setProgress(ratio)
  }

  return (
    <div className={`music-player${isExpanded ? ' music-player-expanded' : ''}`}>
      <audio ref={audioRef} src={track.src} />
      <div className="music-player-bar">
        <div className="music-icon" aria-hidden="true">{isPlaying ? '♪' : '❄'}</div>
        <div className="music-info">
          <p className="music-title">{track.title}</p>
          <div className="music-progress" onClick={handleSeek} role="presentation">
            <div className="music-progress-fill" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
        <div className="music-controls">
          <button className="music-btn" onClick={prev} aria-label="Previous track">⏮</button>
          <button className="music-btn music-btn-main" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button className="music-btn" onClick={next} aria-label="Next track">⏭</button>
        </div>
      </div>
      <button
        type="button"
        className="music-toggle"
        onClick={() => setIsExpanded((e) => !e)}
        aria-expanded={isExpanded}
      >
        <span className="music-toggle-label">{isExpanded ? 'Hide playlist' : 'Show playlist'}</span>
        <span className="music-toggle-chevron" aria-hidden="true">▾</span>
      </button>
      {isExpanded && (
        <ul className="music-playlist">
          {TRACKS.map((t, i) => (
            <li key={t.src}>
              <button
                className={`music-playlist-item${i === trackIndex ? ' active' : ''}`}
                onClick={() => selectTrack(i)}
              >
                <span className="music-playlist-note" aria-hidden="true">{i === trackIndex && isPlaying ? '♪' : '❅'}</span>
                <span className="music-playlist-title">{t.title}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
