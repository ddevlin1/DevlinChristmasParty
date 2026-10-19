import { useCallback, useState } from 'react'
import { partyConfig } from './partyConfig'
import { useCountdown } from './useCountdown'
import Landing from './Landing'
import Intro from './Intro'
import MusicPlayer from './MusicPlayer'

// Phases: 'landing' → 'intro' → 'countdown'

const pad = (n) => String(n).padStart(2, '0')

function CountdownUnit({ value, label }) {
  return (
    <div className="unit">
      <span className="unit-value">{pad(value)}</span>
      <span className="unit-label">{label}</span>
    </div>
  )
}

function Countdown() {
  const { title, dateISO, location, tagline } = partyConfig
  const { total, days, hours, minutes, seconds } = useCountdown(dateISO)
  const isOver = total <= 0

  const prettyDate = new Date(dateISO).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <div className="page">
      <div className="snow" aria-hidden="true" />
      <main className="card">
        <div className="divider" aria-hidden="true" />

        {isOver ? (
          <p className="celebrate">🎉 The party is here — merry Christmas! 🎄</p>
        ) : (
          <div className="countdown" role="timer" aria-live="polite">
            <CountdownUnit value={days} label="Days" />
            <CountdownUnit value={hours} label="Hours" />
            <CountdownUnit value={minutes} label="Minutes" />
            <CountdownUnit value={seconds} label="Seconds" />
          </div>
        )}

        <dl className="details">
          <div>
            <dt>When</dt>
            <dd>{prettyDate}</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{location}</dd>
          </div>
        </dl>
      </main>

      <footer className="footer">
        <span>See you there ❤️</span>
      </footer>

      <MusicPlayer />
    </div>
  )
}

export default function App() {
  const [phase, setPhase] = useState('landing')

  const handleEnter = useCallback(() => setPhase('intro'), [])
  const handleIntroEnd = useCallback(() => setPhase('countdown'), [])

  return (
    <>
      {/* Buffer the video while on the landing page so it plays instantly on Enter */}
      {phase === 'landing' && (
        <video src="/Christmas.mp4" preload="auto" playsInline muted style={{ display: 'none' }} aria-hidden="true" />
      )}
      {phase === 'landing'   && <Landing onEnter={handleEnter} />}
      {phase === 'intro'     && <Intro onComplete={handleIntroEnd} />}
      {phase === 'countdown' && <Countdown />}
    </>
  )
}
