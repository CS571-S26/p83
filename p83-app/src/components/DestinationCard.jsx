import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { useCompletion } from '../context/CompletionContext'
import { useInViewOnce } from '../hooks/useInViewOnce'
import CompletionBadge from './CompletionBadge'

function difficultyClass(d) {
  if (d === 'Easy') return 'bb-diff--easy'
  if (d === 'Moderate') return 'bb-diff--moderate'
  if (d === 'Challenging') return 'bb-diff--hard'
  return 'bb-diff--moderate'
}

function DestinationCard({ trip, index = 0 }) {
  const { toggle, isSaved } = useWishlist()
  const { toggleCompletion, isCompleted } = useCompletion()
  const { ref, visible } = useInViewOnce()
  const saved = isSaved(trip.slug)
  const completed = isCompleted(trip.slug)
  const [pulse, setPulse] = useState(false)

  return (
    <article
      ref={ref}
      className={`bb-dest-card bb-dest-card--${trip.continent} ${visible ? 'bb-dest-card--inview' : ''}`}
      style={{
        transitionDelay: visible ? `${Math.min(index, 12) * 80}ms` : '0ms',
      }}
    >
      <Link to={`/trips/${trip.slug}`} className="bb-dest-card__media">
        <img
          src={trip.imageUrl}
          alt={trip.name}
          className="bb-dest-card__img"
          loading="lazy"
          decoding="async"
        />
      </Link>
      <div className="bb-dest-card__body">
        <div className="bb-dest-card__tags">
          <span className="bb-dest-card__continent">{trip.continentLabel}</span>
          <span className={`bb-diff-badge ${difficultyClass(trip.difficulty)}`}>{trip.difficulty}</span>
          {completed && <CompletionBadge isCompleted={true} />}
        </div>
        <h3 className="bb-dest-card__title">
          <Link to={`/trips/${trip.slug}`}>{trip.name}</Link>
        </h3>
        <p className="bb-dest-card__elev">
          <span className="bb-dest-card__elev-glyph" aria-hidden="true">
            ▲
          </span>
          <span className="bb-dest-card__elev-num">{trip.elevationDisplay}</span>
        </p>
        <p className="bb-dest-card__season">{trip.bestSeason}</p>
        <p className="bb-dest-card__desc">{trip.description[0]}</p>
        <p className="bb-dest-card__desc">{trip.description[1]}</p>
        <div className="bb-dest-card__footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              className={`bb-wishlist-btn ${saved ? 'bb-wishlist-btn--on' : ''} ${pulse ? 'bb-wishlist-btn--pulse' : ''}`}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const adding = !saved
                toggle(trip.slug)
                if (adding) {
                  setPulse(true)
                  window.setTimeout(() => setPulse(false), 320)
                }
              }}
              aria-pressed={saved}
              aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
              title={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            >
              {saved ? '♥' : '♡'}
            </button>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={completed}
                onChange={(e) => {
                  e.stopPropagation()
                  toggleCompletion(trip.slug)
                }}
                style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                aria-label={`Mark ${trip.name} as ${completed ? 'incomplete' : 'completed'}`}
              />
              <span style={{ color: 'var(--color-ink-muted)' }}>Completed</span>
            </label>
          </div>
          <Link to={`/trips/${trip.slug}`} className="bb-dest-card__read">
            Read report →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default DestinationCard
