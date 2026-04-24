import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { TRIPS } from '../data/trips'
import { useWishlist } from '../context/WishlistContext'
import { useCompletion } from '../context/CompletionContext'
import CompletionBadge from './CompletionBadge'

function difficultyClass(d) {
  if (d === 'Easy') return 'bb-diff--easy'
  if (d === 'Moderate') return 'bb-diff--moderate'
  if (d === 'Challenging') return 'bb-diff--hard'
  return 'bb-diff--moderate'
}

export default function WishlistSidebar() {
  const { ids, remove, clearAll } = useWishlist()
  const { isCompleted, completedTrips } = useCompletion()
  const [open, setOpen] = useState(false)
  const [sortBy, setSortBy] = useState('dateAdded')
  const prevCount = useRef(ids.length)

  useEffect(() => {
    let rafId
    if (prevCount.current === 0 && ids.length === 1) {
      rafId = requestAnimationFrame(() => setOpen(true))
    }
    prevCount.current = ids.length
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ids.length])

  useEffect(() => {
    if (open) document.body.classList.add('bb-wishlist-open')
    else document.body.classList.remove('bb-wishlist-open')
    return () => document.body.classList.remove('bb-wishlist-open')
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const items = useMemo(() => {
    let trips = ids.map((id) => TRIPS.find((t) => t.slug === id)).filter(Boolean)

    // Apply sorting
    if (sortBy === 'name') {
      trips = trips.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === 'difficulty') {
      const difficultyOrder = { Easy: 1, Moderate: 2, Challenging: 3 }
      trips = trips.sort((a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty])
    }
    // 'dateAdded' keeps the original order (most recent first)

    return trips
  }, [ids, sortBy])

  const countLabel = items.length > 0 ? ` (${items.length})` : ''
  const completedCount = items.filter(t => isCompleted(t.slug)).length

  return (
    <>
      <button type="button" className="bb-wishlist-tab" onClick={() => setOpen(true)}>
        Wishlist{countLabel}
      </button>

      <div
        className={`bb-wishlist-backdrop ${open ? 'bb-wishlist-backdrop--visible' : ''}`}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
        role="presentation"
      />

      <aside
        className={`bb-wishlist-panel ${open ? 'bb-wishlist-panel--open' : ''}`}
        aria-hidden={!open}
        aria-label="Wishlist"
      >
        <div className="bb-wishlist-panel__head">
          <h2 className="bb-wishlist-panel__title">Wishlist{countLabel}</h2>
          <button
            type="button"
            className="bb-wishlist-panel__close"
            onClick={() => setOpen(false)}
            aria-label="Close wishlist"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="bb-wishlist-panel__empty">
            <span className="bb-wishlist-panel__empty-icon" aria-hidden="true">
              ♡
            </span>
            <p className="bb-wishlist-panel__empty-text">No trips saved yet.</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)', marginTop: '0.5rem' }}>
              Add trips to your wishlist by clicking the heart icon on any trip card.
            </p>
          </div>
        ) : (
          <>
            <div style={{ padding: '0 1.5rem 1rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-ink-muted)' }}>
                  {completedCount} of {items.length} completed
                </div>
                <button
                  type="button"
                  onClick={clearAll}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-ember)',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: 0
                  }}
                >
                  Clear All
                </button>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bb-input"
                style={{ width: '100%', padding: '0.5rem', fontSize: '0.875rem' }}
              >
                <option value="dateAdded">Date Added</option>
                <option value="name">Name (A-Z)</option>
                <option value="difficulty">Difficulty</option>
              </select>
            </div>
            <ul className="bb-wishlist-panel__list">
              {items.map((t) => (
                <li key={t.slug} className="bb-wishlist-panel__item">
                  <Link
                    to={`/trips/${t.slug}`}
                    className="bb-wishlist-panel__row"
                    onClick={() => setOpen(false)}
                  >
                    <img
                      src={t.imageUrl}
                      alt={t.name}
                      className="bb-wishlist-panel__thumb"
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="bb-wishlist-panel__body">
                      <span className="bb-wishlist-panel__name">{t.name}</span>
                      <div className="bb-wishlist-panel__tags">
                        <span className="bb-wishlist-panel__continent">{t.continentLabel}</span>
                        <span className={`bb-diff-badge bb-diff-badge--sm ${difficultyClass(t.difficulty)}`}>
                          {t.difficulty}
                        </span>
                        {isCompleted(t.slug) && <CompletionBadge isCompleted={true} />}
                      </div>
                    </div>
                  </Link>
                  <button
                    type="button"
                    className="bb-wishlist-panel__remove"
                    onClick={() => remove(t.slug)}
                    aria-label={`Remove ${t.name} from wishlist`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </>
  )
}
