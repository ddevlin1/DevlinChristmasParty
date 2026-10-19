import { useEffect, useState } from 'react'

function getTimeLeft(target) {
  const total = target - Date.now()
  const clamped = Math.max(total, 0)
  const seconds = Math.floor((clamped / 1000) % 60)
  const minutes = Math.floor((clamped / 1000 / 60) % 60)
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24)
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24))
  return { total, days, hours, minutes, seconds }
}

// Ticks every second and returns the time remaining until `targetISO`.
export function useCountdown(targetISO) {
  const target = new Date(targetISO).getTime()
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}
