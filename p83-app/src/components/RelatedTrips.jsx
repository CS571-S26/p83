import { Link } from 'react-router-dom'
import { TRIPS } from '../data/trips'

export default function RelatedTrips({ currentTrip }) {
  const relatedTrips = TRIPS.filter(
    (trip) =>
      trip.slug !== currentTrip.slug &&
      (trip.continent === currentTrip.continent || trip.difficulty === currentTrip.difficulty)
  )
    .slice(0, 3)

  if (relatedTrips.length === 0) {
    return null
  }

  return (
    <section className="bb-detail-section bb-related-trips">
      <h2 className="bb-detail-section__title">Related trips</h2>
      <p className="bb-detail-section__subtitle">
        Similar destinations based on continent and difficulty
      </p>
      <div className="bb-related-trips__grid">
        {relatedTrips.map((trip) => (
          <Link key={trip.slug} to={`/trips/${trip.slug}`} className="bb-related-trip-card">
            <div
              className="bb-related-trip-card__image"
              style={{ backgroundImage: `url("${trip.imageUrl}")` }}
              role="img"
              aria-label={`${trip.name} landscape`}
            />
            <div className="bb-related-trip-card__content">
              <h3 className="bb-related-trip-card__title">{trip.name}</h3>
              <p className="bb-related-trip-card__region">{trip.regionLabel}</p>
              <p className="bb-related-trip-card__difficulty">{trip.difficulty}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
