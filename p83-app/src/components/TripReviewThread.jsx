import { useMemo, useState } from 'react'
import TripReviewForm from './TripReviewForm'
import { addVote, removeVote, hasVoted, getVoteCount } from '../lib/votesStorage'

function buildNested(flat) {
  const byParent = new Map()
  for (const item of flat) {
    const pid = item.parentId === null ? 'root' : item.parentId
    if (!byParent.has(pid)) byParent.set(pid, [])
    byParent.get(pid).push(item)
  }
  const roots = byParent.get('root') || []
  roots.sort((a, b) => b.at.localeCompare(a.at))

  function walk(node) {
    const kids = (byParent.get(node.id) || []).slice().sort((a, b) => a.at.localeCompare(b.at))
    return { node, children: kids.map(walk) }
  }
  return roots.map(walk)
}

function formatWhen(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

function ReplyForm({ parentId, onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !text.trim()) return
    onSubmit({ parentId, visitorName: name.trim(), body: text.trim() })
    setName('')
    setText('')
    onCancel()
  }

  return (
    <form className="bb-thread-reply-form" onSubmit={handleSubmit}>
      <label className="bb-thread-reply-form__label" htmlFor={`bb-reply-name-${parentId}`}>
        Your name
      </label>
      <input
        id={`bb-reply-name-${parentId}`}
        type="text"
        className="bb-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"
      />
      <label className="bb-thread-reply-form__label" htmlFor={`bb-reply-body-${parentId}`}>
        Reply
      </label>
      <textarea
        id={`bb-reply-body-${parentId}`}
        className="bb-input bb-textarea"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <div className="bb-thread-reply-form__actions">
        <button type="submit" className="bb-btn bb-btn--primary">
          Post reply
        </button>
        <button type="button" className="bb-thread-reply-form__cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function ThreadPost({ wrap, visitorId, onReply, onDelete, onEdit, depth }) {
  const { node, children } = wrap
  const [replyOpen, setReplyOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(node.body)
  const [voteCount, setVoteCount] = useState(getVoteCount(node.id))
  const [hasUserVoted, setHasUserVoted] = useState(hasVoted(node.id, visitorId))
  const isOwner = node.authorId === visitorId
  const isTop = node.parentId === null

  const handleVote = () => {
    if (hasUserVoted) {
      if (removeVote(node.id, visitorId)) {
        setVoteCount((prev) => Math.max(0, prev - 1))
        setHasUserVoted(false)
      }
    } else {
      if (addVote(node.id, visitorId)) {
        setVoteCount((prev) => prev + 1)
        setHasUserVoted(true)
      }
    }
  }

  const handleSaveEdit = () => {
    if (editText.trim() && editText !== node.body) {
      onEdit(node.id, editText.trim())
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditText(node.body)
    setIsEditing(false)
  }

  return (
    <li className="bb-thread__item">
      <div className={`bb-thread-card ${depth > 0 ? 'bb-thread-card--reply' : ''}`}>
        <div className="bb-thread-card__meta">
          <strong className="bb-thread-card__name">{node.visitorName}</strong>
          <time className="bb-thread-card__time" dateTime={node.at}>
            {formatWhen(node.at)}
          </time>
          {isTop && node.rating != null && node.rating > 0 && (
            <span className="bb-review-card__stars" aria-label={`${node.rating} stars`}>
              {'★'.repeat(node.rating)}
              {'☆'.repeat(5 - node.rating)}
            </span>
          )}
          {isTop && node.season ? (
            <span className="bb-review-card__season">{node.season}</span>
          ) : null}
        </div>
        {isEditing ? (
          <div className="bb-thread-card__edit">
            <textarea
              className="bb-input bb-textarea"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              rows={4}
              autoFocus
            />
            <div className="bb-thread-card__edit-actions">
              <button type="button" className="bb-btn bb-btn--primary bb-btn--sm" onClick={handleSaveEdit}>
                Save
              </button>
              <button type="button" className="bb-thread-card__cancel" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="bb-thread-card__body">
              {node.body}
              {node.edited && <em className="bb-thread-card__edited"> (edited)</em>}
            </p>
            <div className="bb-thread-card__actions">
              <button
                type="button"
                className={`bb-thread-card__vote ${hasUserVoted ? 'bb-thread-card__vote--voted' : ''}`}
                onClick={handleVote}
                title={hasUserVoted ? 'Remove vote' : 'Mark as helpful'}
              >
                👍 {hasUserVoted ? 'Helpful' : 'Helpful'}
                {voteCount > 0 ? ` (${voteCount})` : ''}
              </button>
              <button
                type="button"
                className="bb-thread-card__reply-btn"
                onClick={() => setReplyOpen((o) => !o)}
              >
                {replyOpen ? 'Close' : 'Reply'}
              </button>
              {isOwner ? (
                <>
                  <button
                    type="button"
                    className="bb-thread-card__edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="bb-thread-card__delete"
                    onClick={() => onDelete(node.id)}
                  >
                    Delete
                  </button>
                </>
              ) : null}
            </div>
          </>
        )}
        {replyOpen ? (
          <ReplyForm
            parentId={node.id}
            onSubmit={(payload) => {
              onReply(payload)
              setReplyOpen(false)
            }}
            onCancel={() => setReplyOpen(false)}
          />
        ) : null}
      </div>
      {children.length > 0 ? (
        <ul className="bb-thread__children">
          {children.map((c) => (
            <ThreadPost
              key={c.node.id}
              wrap={c}
              visitorId={visitorId}
              onReply={onReply}
              onDelete={onDelete}
              onEdit={onEdit}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export default function TripReviewThread({
  tripName,
  visitorId,
  addTopLevel,
  addReply,
  deleteIfOwner,
  editIfOwner,
  flat,
}) {
  const tree = useMemo(() => buildNested(flat), [flat])

  return (
    <section id="reviews" className="bb-thread-section" aria-label="Trail comments and reviews">
      <TripReviewForm
        trailName={tripName}
        onSubmitReview={(payload) => addTopLevel(payload)}
      />

      {tree.length > 0 ? (
        <div className="bb-reviews bb-reviews--thread">
          <h3 className="bb-reviews__title">Discussion</h3>
          <ul className="bb-thread__list">
            {tree.map((w) => (
              <ThreadPost
                key={w.node.id}
                wrap={w}
                visitorId={visitorId}
                onReply={addReply}
                onDelete={deleteIfOwner}
                onEdit={editIfOwner}
                depth={0}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
