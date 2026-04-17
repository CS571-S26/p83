import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTripBySlug } from '../data/trips'
import TripReviewThread from '../components/TripReviewThread'
import DetailStats from '../components/DetailStats'
import SectionReveal from '../components/SectionReveal'
import { useTripReviews } from '../hooks/useTripReviews'

export default function TripDetailPage() {
  const { slug } = useParams()
  const trip = useMemo(() => getTripBySlug(slug), [slug])
  const { flat, visitorId, addTopLevel, addReply, deleteIfOwner } = useTripReviews(slug || '')

  if (!trip) {
    return <Navigate to="/trips" replace />
  }

  return (
    <article className="bb-detail">
      <header className="bb-detail-hero">
        <img src={trip.imageUrl} alt="" className="bb-detail-hero__img" />
        <div className="bb-detail-hero__shade" />
        <div className="bb-detail-hero__titlewrap bb-shell">
          <p className="bb-detail-hero__eyebrow">{trip.regionLabel}</p>
          <h1 className="bb-detail-hero__title">{trip.name}</h1>
        </div>
      </header>

      <div className="bb-shell bb-detail__inner">
        <nav className="bb-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/trips">Trips</Link>
          <span aria-hidden="true"> / </span>
          <span>{trip.name}</span>
        </nav>

        <DetailStats trip={trip} />

        <hr className="bb-rule" />

        <section className="bb-detail-section">
          <SectionReveal>
            <h2 className="bb-detail-section__title">Trip report</h2>
          </SectionReveal>
          {trip.report.map((para, i) => (
            <p key={i} className="bb-detail-section__p">
              {para}
            </p>
          ))}
        </section>

        <section className="bb-detail-section">
          <SectionReveal>
            <h2 className="bb-detail-section__title">Gear notes</h2>
          </SectionReveal>
          <ul className="bb-detail-gear">
            {trip.gear.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        <hr className="bb-rule" />

        <TripReviewThread
          tripName={trip.name}
          visitorId={visitorId}
          addTopLevel={addTopLevel}
          addReply={addReply}
          deleteIfOwner={deleteIfOwner}
          flat={flat}
        />

        <p className="bb-detail-back">
          <Link to="/trips">← All destinations</Link>
        </p>
      </div>
    </article>
  )
}
