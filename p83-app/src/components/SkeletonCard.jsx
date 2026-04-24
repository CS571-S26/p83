export default function SkeletonCard() {
  return (
    <div className="bb-skeleton-card" aria-label="Loading trip card">
      <div className="bb-skeleton-card__image" />
      <div className="bb-skeleton-card__content">
        <div className="bb-skeleton-card__line bb-skeleton-card__line--title" />
        <div className="bb-skeleton-card__line bb-skeleton-card__line--subtitle" />
        <div className="bb-skeleton-card__line bb-skeleton-card__line--text" />
      </div>
    </div>
  )
}
