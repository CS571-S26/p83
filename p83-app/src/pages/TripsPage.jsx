import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  CONTINENT_FILTERS,
  DIFFICULTY_FILTERS,
  filterTrips,
  HOME_CONTINENT_CARDS,
  TRIPS,
  TYPE_FILTERS,
} from '../data/trips'
import DestinationCard from '../components/DestinationCard'
import SectionReveal from '../components/SectionReveal'

function continentDisplayLabel(pill, continent) {
  if (pill) {
    const card = HOME_CONTINENT_CARDS.find((c) => c.pillRegion === pill)
    if (card) return card.title
    return pill
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  }
  return CONTINENT_FILTERS.find((f) => f.id === continent)?.label ?? 'All'
}

const AMERICAS_PILLS = ['central-america', 'south-america', 'north-america']

function isContinentOptionActive(f, pill, continentActive) {
  if (pill) {
    if (f.id === 'all') return false
    if (f.id === 'americas' && AMERICAS_PILLS.includes(pill)) return true
    if (['africa', 'asia', 'europe'].includes(f.id) && pill === f.id) return true
    return false
  }
  return continentActive === f.id
}

export default function TripsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const pill = searchParams.get('pill') || ''

  const [continent, setContinent] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [tripType, setTripType] = useState('all')
  const [openMenu, setOpenMenu] = useState(null)

  const wrapRef = useRef(null)

  const clearPill = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('pill')
    setSearchParams(next, { replace: true })
  }

  const selectContinent = (id) => {
    clearPill()
    setContinent(id)
  }

  const filtered = useMemo(
    () =>
      filterTrips(TRIPS, {
        continent,
        difficulty,
        tripType,
        pillRegion: pill || 'all',
      }),
    [continent, difficulty, tripType, pill],
  )

  const continentActive = pill ? 'all' : continent
  const filterKey = `${pill}|${continent}|${difficulty}|${tripType}`

  const continentBtnLabel = useMemo(
    () => continentDisplayLabel(pill, continent),
    [pill, continent],
  )
  const difficultyBtnLabel = DIFFICULTY_FILTERS.find((f) => f.id === difficulty)?.label ?? 'All'
  const typeBtnLabel = TYPE_FILTERS.find((f) => f.id === tripType)?.label ?? 'All'

  const hasActiveFilters =
    Boolean(pill) || continent !== 'all' || difficulty !== 'all' || tripType !== 'all'

  const clearAll = () => {
    setContinent('all')
    setDifficulty('all')
    setTripType('all')
    clearPill()
    setOpenMenu(null)
  }

  useEffect(() => {
    if (!openMenu) return undefined
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [openMenu])

  useEffect(() => {
    if (!openMenu) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openMenu])

  const toggleMenu = (id) => {
    setOpenMenu((prev) => (prev === id ? null : id))
  }

  return (
    <main className="bb-page bb-trips-page">
      <div className="bb-shell bb-page-header">
        <SectionReveal>
          <div className="bb-eyebrow-row">
            <span className="bb-eyebrow-rule" aria-hidden="true" />
            <p className="bb-eyebrow">Destinations</p>
          </div>
          <h1 className="bb-page-title">Trip explorer</h1>
          <p className="bb-page-lead">
            Filter by continent, difficulty, and route type. All eight field reports live here.
          </p>
        </SectionReveal>
      </div>

      <div className="bb-shell">
        <div className="bb-trip-filters-wrap" ref={wrapRef}>
          <div className="bb-trip-filters">
            <div className="bb-trip-filters__bar">
              <div className="bb-trip-filters__controls">
                <div className="bb-trip-filters__control bb-trip-filters__control--first">
                  <button
                    type="button"
                    className="bb-trip-filters__trigger"
                    aria-expanded={openMenu === 'continent'}
                    aria-haspopup="listbox"
                    onClick={() => toggleMenu('continent')}
                  >
                    <span className="bb-trip-filters__trigger-label">Continent</span>
                    <span className="bb-trip-filters__trigger-value">
                      {continentBtnLabel}
                      <span
                        className={`bb-trip-filters__chev ${openMenu === 'continent' ? 'bb-trip-filters__chev--open' : ''}`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </span>
                  </button>
                  {openMenu === 'continent' && (
                    <ul className="bb-trip-filters__panel" role="listbox">
                      {CONTINENT_FILTERS.map((f) => {
                        const active = isContinentOptionActive(f, pill, continentActive)
                        return (
                          <li key={f.id} role="none">
                            <button
                              type="button"
                              role="option"
                              aria-selected={active}
                              className={`bb-trip-filters__option ${active ? 'bb-trip-filters__option--active' : ''}`}
                              onClick={() => {
                                selectContinent(f.id)
                                setOpenMenu(null)
                              }}
                            >
                              <span>{f.label}</span>
                              {active ? (
                                <span className="bb-trip-filters__check" aria-hidden="true">
                                  ✓
                                </span>
                              ) : null}
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>

                <span className="bb-trip-filters__divider bb-trip-filters__divider--between" aria-hidden="true" />

                <div className="bb-trip-filters__control">
                  <button
                    type="button"
                    className="bb-trip-filters__trigger"
                    aria-expanded={openMenu === 'difficulty'}
                    aria-haspopup="listbox"
                    onClick={() => toggleMenu('difficulty')}
                  >
                    <span className="bb-trip-filters__trigger-label">Difficulty</span>
                    <span className="bb-trip-filters__trigger-value">
                      {difficultyBtnLabel}
                      <span
                        className={`bb-trip-filters__chev ${openMenu === 'difficulty' ? 'bb-trip-filters__chev--open' : ''}`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </span>
                  </button>
                  {openMenu === 'difficulty' && (
                    <ul className="bb-trip-filters__panel" role="listbox">
                      {DIFFICULTY_FILTERS.map((f) => (
                        <li key={f.id} role="none">
                          <button
                            type="button"
                            role="option"
                            aria-selected={difficulty === f.id}
                            className={`bb-trip-filters__option ${difficulty === f.id ? 'bb-trip-filters__option--active' : ''}`}
                            onClick={() => {
                              setDifficulty(f.id)
                              setOpenMenu(null)
                            }}
                          >
                            <span>{f.label}</span>
                            {difficulty === f.id ? (
                              <span className="bb-trip-filters__check" aria-hidden="true">
                                ✓
                              </span>
                            ) : null}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <span className="bb-trip-filters__divider bb-trip-filters__divider--between" aria-hidden="true" />

                <div className="bb-trip-filters__control">
                  <button
                    type="button"
                    className="bb-trip-filters__trigger"
                    aria-expanded={openMenu === 'type'}
                    aria-haspopup="listbox"
                    onClick={() => toggleMenu('type')}
                  >
                    <span className="bb-trip-filters__trigger-label">Type</span>
                    <span className="bb-trip-filters__trigger-value">
                      {typeBtnLabel}
                      <span
                        className={`bb-trip-filters__chev ${openMenu === 'type' ? 'bb-trip-filters__chev--open' : ''}`}
                        aria-hidden="true"
                      >
                        ▾
                      </span>
                    </span>
                  </button>
                  {openMenu === 'type' && (
                    <ul className="bb-trip-filters__panel" role="listbox">
                      {TYPE_FILTERS.map((f) => (
                        <li key={f.id} role="none">
                          <button
                            type="button"
                            role="option"
                            aria-selected={tripType === f.id}
                            className={`bb-trip-filters__option ${tripType === f.id ? 'bb-trip-filters__option--active' : ''}`}
                            onClick={() => {
                              setTripType(f.id)
                              setOpenMenu(null)
                            }}
                          >
                            <span>{f.label}</span>
                            {tripType === f.id ? (
                              <span className="bb-trip-filters__check" aria-hidden="true">
                                ✓
                              </span>
                            ) : null}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <span className="bb-trip-filters__divider bb-trip-filters__divider--before-meta" aria-hidden="true" />

              <div className="bb-trip-filters__meta">
                <p className="bb-trip-filters__count" role="status">
                  Showing {filtered.length} of {TRIPS.length} destinations
                </p>
                {hasActiveFilters ? (
                  <>
                    <span className="bb-trip-filters__meta-sep" aria-hidden="true">
                      {' '}
                      ·{' '}
                    </span>
                    <button type="button" className="bb-trip-filters__clear" onClick={clearAll}>
                      Clear all
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="bb-dest-grid" key={filterKey}>
          {filtered.map((trip, index) => (
            <DestinationCard key={trip.slug} trip={trip} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="bb-empty-results">No trips match these filters. Try widening one row.</p>
        )}
      </div>
    </main>
  )
}
