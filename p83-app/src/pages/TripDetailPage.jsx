import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTripBySlug } from '../data/trips'
import TripReviewForm from '../components/TripReviewForm'
import DetailStats from '../components/DetailStats'
import SectionReveal from '../components/SectionReveal'

export default function TripDetailPage() {
  const { slug } = useParams()
  const trip = useMemo(() => getTripBySlug(slug), [slug])
  const [reviews, setReviews] = useState([])

  if (!trip) {
    return <Navigate to="/trips" replace />
  }

  function addReview(r) {
    setReviews((prev) => [r, ...prev])
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

        <TripReviewForm trailName={trip.name} onSubmitReview={addReview} />

        {reviews.length > 0 && (
          <div className="bb-reviews">
            <h3 className="bb-reviews__title">Recent reviews</h3>
            <ul className="bb-reviews__list">
              {reviews.map((r) => (
                <li key={r.id} className="bb-review-card">
                  <div className="bb-review-card__meta">
                    <strong>{r.visitorName}</strong>
                    <span className="bb-review-card__stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                    <span className="bb-review-card__season">{r.season}</span>
                  </div>
                  <p className="bb-review-card__text">{r.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="bb-detail-back">
          <Link to="/trips">← All destinations</Link>
        </p>
      </div>
    </article>
  )
}
