import { useState } from 'react'

const SEASONS = [
  'Select season',
  'Winter',
  'Spring',
  'Summer',
  'Fall',
  'Dry season',
  'Monsoon / wet',
]

function StarInput({ value, onChange }) {
  return (
    <div className="bb-stars" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`bb-star ${n <= value ? 'bb-star--on' : ''}`}
          onClick={() => onChange(n)}
          aria-label={`${n} stars`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function TripReviewForm({ trailName, onSubmitReview }) {
  const [visitorName, setVisitorName] = useState('')
  const [rating, setRating] = useState(0)
  const [season, setSeason] = useState(SEASONS[0])
  const [comment, setComment] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!visitorName.trim() || rating < 1 || !comment.trim()) return
    onSubmitReview({
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `r-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      trailName,
      visitorName: visitorName.trim(),
      rating,
      season: season === SEASONS[0] ? 'Not specified' : season,
      comment: comment.trim(),
      at: new Date().toISOString(),
    })
    setVisitorName('')
    setRating(0)
    setSeason(SEASONS[0])
    setComment('')
  }

  return (
    <form className="bb-review-form" onSubmit={handleSubmit}>
      <h2 className="bb-review-form__title">Trail comment and review</h2>
      <div className="bb-review-form__row">
        <label htmlFor="bb-trail-name">Trail</label>
        <input id="bb-trail-name" type="text" value={trailName} readOnly className="bb-input" />
      </div>
      <div className="bb-review-form__row">
        <label htmlFor="bb-visitor">Your name</label>
        <input
          id="bb-visitor"
          type="text"
          value={visitorName}
          onChange={(e) => setVisitorName(e.target.value)}
          className="bb-input"
          required
          autoComplete="name"
        />
      </div>
      <div className="bb-review-form__row">
        <span id="bb-rating-label">Rating</span>
        <StarInput value={rating} onChange={setRating} />
      </div>
      <div className="bb-review-form__row">
        <label htmlFor="bb-season">Season visited</label>
        <select
          id="bb-season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          className="bb-input"
        >
          {SEASONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="bb-review-form__row">
        <label htmlFor="bb-comment">Comment</label>
        <textarea
          id="bb-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="bb-input bb-textarea"
          rows={4}
          required
        />
      </div>
      <button type="submit" className="bb-btn bb-btn--primary">
        Submit review
      </button>
    </form>
  )
}
