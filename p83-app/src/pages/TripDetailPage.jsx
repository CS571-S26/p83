import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { getTripBySlug } from '../data/trips'
import TripReviewThread from '../components/TripReviewThread'
import DetailStats from '../components/DetailStats'
import SectionReveal from '../components/SectionReveal'
import ToastContainer from '../components/ToastContainer'
import BackToTop from '../components/BackToTop'
import ShareButton from '../components/ShareButton'
import ImageLightbox from '../components/ImageLightbox'
import RelatedTrips from '../components/RelatedTrips'
import DifficultyBar from '../components/DifficultyBar'
import { useTripReviews } from '../hooks/useTripReviews'
import { useToast } from '../hooks/useToast'

export default function TripDetailPage() {
  const { slug } = useParams()
  const trip = useMemo(() => getTripBySlug(slug), [slug])
  const { flat, visitorId, addTopLevel, addReply, deleteIfOwner, editIfOwner, undoDelete } =
    useTripReviews(slug || '')
  const { toasts, showToast, dismissToast } = useToast()
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!trip) {
    return <Navigate to="/trips" replace />
  }

  return (
    <article className="bb-detail">
      <header className="bb-detail-hero" onClick={() => setLightboxOpen(true)} style={{ cursor: 'pointer' }} title="Click to view full image">
        <img src={trip.imageUrl} alt={`${trip.name} hero image`} className="bb-detail-hero__img" />
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <DifficultyBar difficulty={trip.difficulty} />
          <ShareButton url={window.location.href} title={trip.name} />
        </div>

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
          editIfOwner={editIfOwner}
          undoDelete={undoDelete}
          showToast={showToast}
          flat={flat}
        />

        <hr className="bb-rule" />

        <RelatedTrips currentTrip={trip} />

        <ToastContainer toasts={toasts} onDismiss={dismissToast} />

        <p className="bb-detail-back">
          <Link to="/trips">← All destinations</Link>
        </p>
      </div>

      <BackToTop />

      {lightboxOpen && (
        <ImageLightbox
          imageUrl={trip.imageUrl}
          alt={`${trip.name} full view`}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </article>
  )
}
