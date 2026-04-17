import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  deleteCommentCascade,
  getThread,
  saveThread,
} from '../lib/reviewsStorage'
import { getOrCreateVisitorId } from '../lib/visitorId'

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function useTripReviews(slug) {
  const [flat, setFlat] = useState(() => getThread(slug))
  const visitorId = useMemo(() => getOrCreateVisitorId(), [])

  useEffect(() => {
    setFlat(getThread(slug))
  }, [slug])

  const persist = useCallback(
    (next) => {
      saveThread(slug, next)
      setFlat(next)
    },
    [slug],
  )

  const addTopLevel = useCallback(
    ({ visitorName, rating, season, body }) => {
      const authorId = getOrCreateVisitorId()
      const item = {
        id: newId(),
        slug,
        parentId: null,
        authorId,
        visitorName: visitorName.trim(),
        rating,
        season,
        body: body.trim(),
        at: new Date().toISOString(),
      }
      persist([item, ...getThread(slug)])
    },
    [slug, persist],
  )

  const addReply = useCallback(
    ({ parentId, visitorName, body }) => {
      const authorId = getOrCreateVisitorId()
      const item = {
        id: newId(),
        slug,
        parentId,
        authorId,
        visitorName: visitorName.trim(),
        rating: null,
        season: '',
        body: body.trim(),
        at: new Date().toISOString(),
      }
      persist([...getThread(slug), item])
    },
    [slug, persist],
  )

  const deleteIfOwner = useCallback(
    (id) => {
      const thread = getThread(slug)
      const target = thread.find((x) => x.id === id)
      if (!target || target.authorId !== visitorId) return
      deleteCommentCascade(slug, id)
      setFlat(getThread(slug))
    },
    [slug, visitorId],
  )

  return {
    flat,
    visitorId,
    addTopLevel,
    addReply,
    deleteIfOwner,
  }
}
