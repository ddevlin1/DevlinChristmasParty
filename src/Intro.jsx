import { useEffect, useRef, useState } from 'react'

export default function Intro({ onComplete }) {
  const videoRef = useRef(null)
  const doneRef = useRef(false)
  const [progress, setProgress] = useState(0)

  const done = () => {
    if (doneRef.current) return
    doneRef.current = true
    onComplete()
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {}) // ignore transient play() rejections; the timer below is the only skip trigger

    const skipTimer = setTimeout(done, 2 * 60 * 1000)

    const handleTimeUpdate = () => {
      if (video.duration) setProgress(video.currentTime / video.duration)
    }
    video.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      clearTimeout(skipTimer)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="intro">
      <video
        ref={videoRef}
        className="intro-video"
        src="/Christmas.mp4"
        playsInline
        onEnded={done}
        onError={done}
      />
      <div className="intro-vignette" aria-hidden="true" />
      <button className="intro-close" onClick={done} aria-label="Close video">✕</button>
      <div className="intro-progress" aria-hidden="true">
        <div className="intro-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}
