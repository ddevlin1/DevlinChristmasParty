const LIGHT_COUNT = 22

export default function Landing({ onEnter }) {
  return (
    <div className="landing">
      <div className="snow" aria-hidden="true" />
      <div className="landing-lights" aria-hidden="true">
        {Array.from({ length: LIGHT_COUNT }, (_, i) => (
          <span
            key={i}
            className={`light light-${(i % 3) + 1}`}
            style={{ '--delay': `${(i * 0.14).toFixed(2)}s` }}
          />
        ))}
      </div>
      <div className="landing-vignette" aria-hidden="true" />
      <div className="landing-content">
        <svg className="landing-tree" viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          {/* trunk */}
          <rect x="50" y="148" width="20" height="28" rx="2" fill="#5c3317" />
          <ellipse cx="60" cy="149" rx="22" ry="5" fill="rgba(255,255,255,0.22)" />
          {/* bottom tier */}
          <polygon points="60,84 102,148 18,148" fill="#1a6b22" />
          <polygon points="60,84 99,143 21,143" fill="#228b2e" />
          <polygon points="18,148 38,134 60,139 82,134 102,148" fill="rgba(255,255,255,0.16)" />
          {/* middle tier */}
          <polygon points="60,52 94,108 26,108" fill="#1a6b22" />
          <polygon points="60,52 91,103 29,103" fill="#228b2e" />
          <polygon points="26,108 44,96 60,100 76,96 94,108" fill="rgba(255,255,255,0.16)" />
          {/* top tier */}
          <polygon points="60,20 86,70 34,70" fill="#1a6b22" />
          <polygon points="60,20 84,67 36,67" fill="#228b2e" />
          <polygon points="34,70 48,61 60,64 72,61 86,70" fill="rgba(255,255,255,0.16)" />
          {/* garland */}
          <path d="M34,70 Q47,78 60,74 Q73,78 86,70" fill="none" stroke="#f6c945" strokeWidth="1.4" opacity="0.5" />
          <path d="M26,108 Q44,118 60,113 Q76,118 94,108" fill="none" stroke="#f6c945" strokeWidth="1.4" opacity="0.5" />
          {/* ornaments */}
          <circle cx="42" cy="98" r="5.5" fill="#cc2200" />
          <circle cx="80" cy="101" r="5.5" fill="#f6c945" />
          <circle cx="56" cy="125" r="5.5" fill="#1a5ce8" />
          <circle cx="84" cy="133" r="5" fill="#cc2200" />
          <circle cx="33" cy="131" r="5" fill="#f6c945" />
          <circle cx="63" cy="63" r="4.5" fill="#cc2200" />
          <circle cx="77" cy="79" r="4" fill="#f6c945" />
          <circle cx="45" cy="77" r="4" fill="#1a5ce8" />
          {/* shine */}
          <circle cx="39" cy="95" r="1.8" fill="rgba(255,255,255,0.6)" />
          <circle cx="77" cy="98" r="1.8" fill="rgba(255,255,255,0.6)" />
          {/* star */}
          <polygon points="60,4 63.5,14 74,14 65.5,20.5 68.5,31 60,24.5 51.5,31 54.5,20.5 46,14 56.5,14" fill="#f6c945" />
          <polygon points="60,4 62.8,12 71.2,12 64.5,17.2 67,25 60,20.5 53,25 55.5,17.2 48.8,12 57.2,12" fill="rgba(255,255,255,0.42)" />
        </svg>

        <p className="landing-eyebrow">You're Invited</p>
        <div className="landing-divider" aria-hidden="true"><span>❄</span></div>
        <button className="enter-btn" onClick={onEnter}>
          <span className="enter-btn-text">Begin the Journey</span>
          <span className="enter-btn-glow" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
