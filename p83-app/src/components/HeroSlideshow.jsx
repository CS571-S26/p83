import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SLIDE_INTERVAL_MS = 5000
const CROSSFADE_MS = 1000
const FALLBACK_BG = '#2C3B2D'

// TO REPLACE: swap each `src` below with your personal photo path, e.g. /images/kilimanjaro.jpg
const SLIDES = [
  {
    id: 'kili',
    // TO REPLACE: swap this URL with your personal photo path, e.g. /images/kilimanjaro.jpg
    src: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=1600&q=80',
    label: 'Kilimanjaro',
  },
  {
    id: 'range',
    // TO REPLACE: swap this URL with your personal photo path
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    label: 'Mountain range',
  },
  {
    id: 'summit',
    // TO REPLACE: swap this URL with your personal photo path
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80',
    label: 'Volcano / summit',
  },
  {
    id: 'lake',
    // TO REPLACE: swap this URL with your personal photo path
    src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1600&q=80',
    label: 'Andean lake',
  },
  {
    id: 'alpine',
    // TO REPLACE: swap this URL with your personal photo path
    src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80',
    label: 'Alpine hiking',
  },
]

export default function HeroSlideshow() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [bgFailed, setBgFailed] = useState({})
  const [ready, setReady] = useState(false)

  const go = useCallback((dir) => {
    setActive((i) => {
      const n = SLIDES.length
      if (dir === 'next') return (i + 1) % n
      if (dir === 'prev') return (i - 1 + n) % n
      if (typeof dir === 'number') return Math.max(0, Math.min(n - 1, dir))
      return i
    })
  }, [])

  // Wait for initial animations to complete before auto-advancing
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (paused || !ready) return undefined
    const t = setInterval(() => go('next'), SLIDE_INTERVAL_MS)
    return () => clearInterval(t)
  }, [paused, ready, go])

  return (
    <section
      className="bb-hero-slideshow"
      aria-label="Featured landscapes"
    >
      <div className="bb-hero-slideshow__slides">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`bb-hero-slideshow__slide ${i === active ? 'bb-hero-slideshow__slide--active' : ''}`}
            style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
            aria-hidden={i !== active}
          >
            <img
              src={slide.src}
              alt={slide.label}
              className="bb-hero-slideshow__probe"
              decoding="async"
              onError={() =>
                setBgFailed((prev) => (prev[slide.id] ? prev : { ...prev, [slide.id]: true }))
              }
            />
            <div
              key={i === active ? `kb-${active}-${slide.id}` : slide.id}
              className={`bb-hero-slideshow__bg ${i === active ? 'bb-hero-slideshow__bg--burn' : ''}`}
              style={{
                backgroundColor: FALLBACK_BG,
                backgroundImage: bgFailed[slide.id] ? 'none' : `url("${slide.src}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          </div>
        ))}
        <div className="bb-hero-slideshow__gradient" aria-hidden="true" />
      </div>

      <button
        type="button"
        className="bb-hero-slideshow__arrow bb-hero-slideshow__arrow--prev"
        onClick={() => go('prev')}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        type="button"
        className="bb-hero-slideshow__arrow bb-hero-slideshow__arrow--next"
        onClick={() => go('next')}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Next slide"
      >
        ›
      </button>

      <div className="bb-hero-slideshow__content">
        <p className="bb-hero-slideshow__eyebrow">FIELD NOTES — BACKPACKING BASECAMP</p>
        <h1 className="bb-hero-slideshow__title">Eight routes. Six continents.</h1>
        <p className="bb-hero-slideshow__sub">
          Summits, volcanoes, gorges, and high lakes — with difficulty, elevation, and gear that
          actually worked.
        </p>
        <Link to="/trips" className="bb-hero-slideshow__cta">
          OPEN TRIP EXPLORER
        </Link>
      </div>

      <div
        className="bb-hero-slideshow__dots"
        role="tablist"
        aria-label="Slide indicators"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}, ${slide.label}`}
            className={`bb-hero-slideshow__dot ${i === active ? 'bb-hero-slideshow__dot--active' : ''}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  )
}
