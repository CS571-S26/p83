import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { TRIPS } from '../data/trips'
import { useWishlist } from '../context/WishlistContext'

function difficultyClass(d) {
  if (d === 'Easy') return 'bb-diff--easy'
  if (d === 'Moderate') return 'bb-diff--moderate'
  if (d === 'Challenging') return 'bb-diff--hard'
  return 'bb-diff--moderate'
}

export default function WishlistSidebar() {
  const { ids, remove } = useWishlist()
  const [open, setOpen] = useState(false)
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

  const items = ids.map((id) => TRIPS.find((t) => t.slug === id)).filter(Boolean)
  const countLabel = items.length > 0 ? ` (${items.length})` : ''

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
          </div>
        ) : (
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
                    alt=""
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
        )}
      </aside>
    </>
  )
}
