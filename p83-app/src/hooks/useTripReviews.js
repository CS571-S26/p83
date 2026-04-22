import { useCallback, useEffect, useState } from 'react'
import {
  deleteCommentCascade,
  editComment,
  getThread,
  restoreComments,
  saveThread,
  subscribeToThread,
} from '../lib/reviewsStorage'
import { getOrCreateVisitorId } from '../lib/visitorId'

export function useTripReviews(slug) {
  const [flat, setFlat] = useState([])
  const [visitorId, setVisitorId] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize visitor ID
  useEffect(() => {
    getOrCreateVisitorId().then(setVisitorId)
  }, [])

  // Load thread on mount/slug change
  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      const thread = await getThread(slug)
      if (!cancelled) {
        setFlat(thread)
        setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [slug])

  // Subscribe to realtime updates
  useEffect(() => {
    const unsubscribe = subscribeToThread(slug, (updated) => {
      setFlat(updated)
    })

    return unsubscribe
  }, [slug])

  const persist = useCallback(
    async (next) => {
      await saveThread(slug, next)
      setFlat(next)
    },
    [slug],
  )

  const addTopLevel = useCallback(
    async ({ visitorName, rating, season, body }) => {
      if (!visitorId) return

      const item = {
        id: crypto.randomUUID(),
        slug,
        parentId: null,
        authorId: visitorId,
        visitorName: visitorName.trim(),
        rating,
        season,
        body: body.trim(),
        at: new Date().toISOString(),
      }

      const current = await getThread(slug)
      await persist([item, ...current])
    },
    [slug, persist, visitorId],
  )

  const addReply = useCallback(
    async ({ parentId, visitorName, body }) => {
      if (!visitorId) return

      const item = {
        id: crypto.randomUUID(),
        slug,
        parentId,
        authorId: visitorId,
        visitorName: visitorName.trim(),
        rating: null,
        season: '',
        body: body.trim(),
        at: new Date().toISOString(),
      }

      const current = await getThread(slug)
      await persist([...current, item])
    },
    [slug, persist, visitorId],
  )

  const deleteIfOwner = useCallback(
    async (id) => {
      if (!visitorId) return null

      const thread = await getThread(slug)
      const target = thread.find((x) => x.id === id)
      if (!target || target.authorId !== visitorId) return null

      const deleted = await deleteCommentCascade(slug, id)
      const updated = await getThread(slug)
      setFlat(updated)
      return deleted
    },
    [slug, visitorId],
  )

  const undoDelete = useCallback(
    async (deletedComments) => {
      await restoreComments(slug, deletedComments)
      const updated = await getThread(slug)
      setFlat(updated)
    },
    [slug],
  )

  const editIfOwner = useCallback(
    async (id, newBody) => {
      if (!visitorId) return

      const thread = await getThread(slug)
      const target = thread.find((x) => x.id === id)
      if (!target || target.authorId !== visitorId) return

      await editComment(slug, id, newBody)
      const updated = await getThread(slug)
      setFlat(updated)
    },
    [slug, visitorId],
  )

  return {
    flat,
    visitorId,
    loading,
    addTopLevel,
    addReply,
    deleteIfOwner,
    editIfOwner,
    undoDelete,
  }
}
