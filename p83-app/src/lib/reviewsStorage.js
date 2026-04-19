const STORAGE_KEY = 'bb-basecamp-reviews'

export function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return {}
  }
}

export function saveAll(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    /* quota */
  }
}

export function getThread(slug) {
  const all = loadAll()
  const list = all[slug]
  return Array.isArray(list) ? list : []
}

export function saveThread(slug, items) {
  const all = loadAll()
  all[slug] = items
  saveAll(all)
}

function collectDescendantIds(flat, rootId) {
  const byParent = new Map()
  for (const item of flat) {
    if (item.parentId) {
      if (!byParent.has(item.parentId)) byParent.set(item.parentId, [])
      byParent.get(item.parentId).push(item.id)
    }
  }
  const toRemove = new Set([rootId])
  const stack = [rootId]
  while (stack.length) {
    const id = stack.pop()
    const kids = byParent.get(id) || []
    for (const k of kids) {
      if (!toRemove.has(k)) {
        toRemove.add(k)
        stack.push(k)
      }
    }
  }
  return toRemove
}

export function deleteCommentCascade(slug, id) {
  const flat = getThread(slug)
  const toRemove = collectDescendantIds(flat, id)
  const next = flat.filter((item) => !toRemove.has(item.id))
  saveThread(slug, next)
}

export function editComment(slug, id, newBody) {
  const flat = getThread(slug)
  const next = flat.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        body: newBody,
        edited: true,
        editedAt: new Date().toISOString(),
      }
    }
    return item
  })
  saveThread(slug, next)
}

export function getThreadStats(slug) {
  const flat = getThread(slug)
  if (flat.length === 0) return { count: 0, lastAt: null }
  let lastAt = flat[0].at
  for (const item of flat) {
    if (item.at > lastAt) lastAt = item.at
  }
  return { count: flat.length, lastAt }
}

export function getAllSlugStats(slugs) {
  const out = {}
  for (const slug of slugs) {
    out[slug] = getThreadStats(slug)
  }
  return out
}
