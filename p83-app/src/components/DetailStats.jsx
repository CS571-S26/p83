import { useEffect, useState } from 'react'
import { useInViewOnce } from '../hooks/useInViewOnce'

function formatElev(n) {
  return n.toLocaleString('en-US')
}

function useCountUp(target, durationMs, enabled) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min(1, (now - start) / durationMs)
      const eased = 1 - (1 - t) ** 2
      setValue(t >= 1 ? target : Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs, enabled])

  return value
}

export default function DetailStats({ trip }) {
  const { ref, visible } = useInViewOnce({ threshold: 0.15 })
  const counted = useCountUp(trip.elevationM, 1200, visible)

  return (
    <section ref={ref} className="bb-detail-stats" aria-label="Trip stats">
      <div className={`bb-detail-stat ${visible ? 'bb-detail-stat--visible' : ''}`}>
        <span className="bb-detail-stat__label">Elevation</span>
        <span className="bb-detail-stat__value bb-detail-stat__value--num">
          ▲ {formatElev(counted)} m
        </span>
      </div>
      <div className={`bb-detail-stat ${visible ? 'bb-detail-stat--visible' : ''}`} style={{ transitionDelay: '80ms' }}>
        <span className="bb-detail-stat__label">Best season</span>
        <span className="bb-detail-stat__value">{trip.bestSeason}</span>
      </div>
      <div className={`bb-detail-stat ${visible ? 'bb-detail-stat--visible' : ''}`} style={{ transitionDelay: '160ms' }}>
        <span className="bb-detail-stat__label">Difficulty</span>
        <span className="bb-detail-stat__value">{trip.difficulty}</span>
      </div>
      <div className={`bb-detail-stat ${visible ? 'bb-detail-stat--visible' : ''}`} style={{ transitionDelay: '240ms' }}>
        <span className="bb-detail-stat__label">Region</span>
        <span className="bb-detail-stat__value">{trip.routeNote}</span>
      </div>
    </section>
  )
}
