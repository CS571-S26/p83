import { Link } from 'react-router-dom'
import { TRIPS } from '../data/trips'
import { getThreadStats } from '../lib/reviewsStorage'
import SectionReveal from '../components/SectionReveal'

function formatLast(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return '—'
  }
}

export default function ForumsPage() {
  const rows = TRIPS.map((trip) => ({
    trip,
    ...getThreadStats(trip.slug),
  }))

  return (
    <main className="bb-page bb-forums-page">
      <div className="bb-shell bb-page-header">
        <SectionReveal>
          <div className="bb-eyebrow-row">
            <span className="bb-eyebrow-rule" aria-hidden="true" />
            <p className="bb-eyebrow">Community</p>
          </div>
          <h1 className="bb-page-title">Forums</h1>
          <p className="bb-page-lead bb-forums-page__lead">
            Separate threads per destination. Open a trip to read or post trail comments and
            reviews. Counts and last activity update from this browser.
          </p>
        </SectionReveal>
      </div>

      <div className="bb-shell">
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
              {rows.map(({ trip, count, lastAt }) => (
                <tr key={trip.slug}>
                  <td>
                    <Link to={`/trips/${trip.slug}#reviews`} className="bb-forums-table__link">
                      {trip.name}
                    </Link>
                    <span className="bb-forums-table__region">{trip.regionLabel}</span>
                  </td>
                  <td>{count}</td>
                  <td>{formatLast(lastAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
