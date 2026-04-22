import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TRIPS } from '../data/trips'
import { getThreadSync, getThreadStatsSync } from '../lib/reviewsStorage'
import SectionReveal from '../components/SectionReveal'

function formatLast(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return '—'
  }
}

function getLatestPost(slug) {
  const thread = getThreadSync(slug)
  if (thread.length === 0) return null
  const sorted = [...thread].sort((a, b) => b.at.localeCompare(a.at))
  return sorted[0]
}

function getActivityBadge(count, lastAt) {
  const hoursSinceActivity = lastAt
    ? (Date.now() - new Date(lastAt).getTime()) / (1000 * 60 * 60)
    : Infinity

  if (count >= 8 && hoursSinceActivity < 24) {
    return (
      <span className="bb-forums-badge bb-forums-badge--hot" title="Very active in last 24 hours">
        Hot
      </span>
    )
  }
  if (hoursSinceActivity < 48) {
    return (
      <span className="bb-forums-badge bb-forums-badge--active" title="Active in last 48 hours">
        Active
      </span>
    )
  }
  return null
}

function getInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function Avatar({ name }) {
  const initials = getInitials(name)

  return (
    <div className="bb-avatar" title={name}>
      {initials}
    </div>
  )
}

export default function ForumsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('activity')

  const rows = useMemo(() => {
    let data = TRIPS.map((trip) => ({
      trip,
      ...getThreadStatsSync(trip.slug),
      latestPost: getLatestPost(trip.slug),
    }))

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      data = data.filter(
        (row) =>
          row.trip.name.toLowerCase().includes(term) ||
          row.trip.regionLabel.toLowerCase().includes(term),
      )
    }

    data.sort((a, b) => {
      if (sortBy === 'activity') {
        if (!a.lastAt) return 1
        if (!b.lastAt) return -1
        return b.lastAt.localeCompare(a.lastAt)
      }
      if (sortBy === 'posts') return b.count - a.count
      if (sortBy === 'name') return a.trip.name.localeCompare(b.trip.name)
      return 0
    })

    return data
  }, [searchTerm, sortBy])

  return (
    <main className="bb-page bb-forums-page">
      <div className="bb-shell bb-page-header">
        <SectionReveal>
          <div className="bb-eyebrow-row">
            <span className="bb-eyebrow-rule" aria-hidden="true" />
            <p className="bb-eyebrow">Community</p>
          </div>
          <h1 className="bb-page-title">Community Forums</h1>
          <p className="bb-page-lead bb-forums-page__lead">
            Join the conversation! Share your experiences, ask questions, and connect with fellow backpackers.
            Each destination has its own discussion thread.
          </p>
        </SectionReveal>
      </div>

      <div className="bb-shell">
        <div className="bb-forums-controls">
          <input
            type="search"
            className="bb-input bb-forums-search"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search forums"
          />
          <div className="bb-forums-sort">
            <label htmlFor="forum-sort">Sort by:</label>
            <select
              id="forum-sort"
              className="bb-input"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="activity">Recent Activity</option>
              <option value="posts">Most Posts</option>
              <option value="name">Destination Name</option>
            </select>
          </div>
        </div>

        {rows.length > 0 ? (
          <>
            <p className="bb-forums-results" role="status">
              Showing <strong>{rows.length}</strong> of <strong>{TRIPS.length}</strong> destinations
            </p>

            <div className="bb-forums-table-wrap">
              <table className="bb-forums-table">
            <thead>
              <tr>
                <th scope="col">Destination</th>
                <th scope="col">Posts</th>
                <th scope="col">Last activity</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ trip, count, lastAt, latestPost }) => (
                <tr key={trip.slug}>
                  <td className="bb-forums-table__dest-col">
                    <div className="bb-forums-table__dest-header">
                      <Link to={`/trips/${trip.slug}#reviews`} className="bb-forums-table__link">
                        {trip.name}
                      </Link>
                      {getActivityBadge(count, lastAt)}
                    </div>
                    <span className="bb-forums-table__region">{trip.regionLabel}</span>
                    {latestPost ? (
                      <div className="bb-forums-table__latest">
                        <Avatar name={latestPost.visitorName} />
                        <div className="bb-forums-table__latest-content">
                          <p className="bb-forums-table__preview">
                            <strong>{latestPost.visitorName}</strong> · {formatLast(latestPost.at)}
                          </p>
                          <p className="bb-forums-table__preview-text">
                            {latestPost.body.substring(0, 120)}
                            {latestPost.body.length > 120 ? '...' : ''}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="bb-forums-table__empty-text">
                        No posts yet. Be the first to share your experience!
                      </p>
                    )}
                  </td>
                  <td className="bb-forums-table__count-col">
                    <span className="bb-forums-table__count-value">{count}</span>
                    <span className="bb-forums-table__count-label">
                      {count === 1 ? 'post' : 'posts'}
                    </span>
                  </td>
                  <td className="bb-forums-table__activity-col">{formatLast(lastAt)}</td>
                </tr>
              ))}
            </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="bb-forums-empty">
            <h3 className="bb-forums-empty__title">No destinations found</h3>
            <p className="bb-forums-empty__text">
              Try adjusting your search or sort criteria.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
