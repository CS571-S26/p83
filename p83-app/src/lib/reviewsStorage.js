import { supabase, ensureAuth, isOnline } from './supabaseClient'

const STORAGE_KEY = 'bb-basecamp-reviews'

// Convert database row to app format
function dbToApp(row) {
  return {
    id: row.id,
    slug: row.slug,
    parentId: row.parent_id,
    authorId: row.author_id,
    visitorName: row.visitor_name,
    rating: row.rating,
    season: row.season || '',
    body: row.body,
    at: row.created_at,
    edited: row.edited || false,
    editedAt: row.edited_at
  }
}

// Convert app format to database
function appToDb(item) {
  return {
    id: item.id,
    slug: item.slug,
    parent_id: item.parentId,
    author_id: item.authorId,
    visitor_name: item.visitorName,
    rating: item.rating,
    season: item.season,
    body: item.body,
    created_at: item.at,
    edited: item.edited,
    edited_at: item.editedAt
  }
}

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

// Fetch from Supabase
export async function getThreadFromSupabase(slug) {
  if (!isOnline()) return null

  await ensureAuth()

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('slug', slug)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch from Supabase:', error)
    return null
  }

  return data.map(dbToApp)
}

// Get thread (try Supabase, fallback localStorage)
export async function getThread(slug) {
  const online = await getThreadFromSupabase(slug)

  if (online !== null) {
    // Cache in localStorage for offline access
    const all = loadAll()
    all[slug] = online
    saveAll(all)
    return online
  }

  // Offline: use localStorage
  const all = loadAll()
  const list = all[slug]
  return Array.isArray(list) ? list : []
}

// Sync to Supabase
async function syncToSupabase(slug, items) {
  await ensureAuth()

  for (const item of items) {
    const dbItem = appToDb(item)
    const { error } = await supabase
      .from('reviews')
      .upsert(dbItem, { onConflict: 'id' })

    if (error) {
      console.error('Failed to sync review to Supabase:', error)
    }
  }
}

// Save thread (save to both)
export async function saveThread(slug, items) {
  // Always save to localStorage (offline cache)
  const all = loadAll()
  all[slug] = items
  saveAll(all)

  // Also sync to Supabase if online
  if (isOnline()) {
    await syncToSupabase(slug, items)
  }
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

// Delete comment cascade
export async function deleteCommentCascade(slug, id) {
  const flat = await getThread(slug)
  const toRemove = collectDescendantIds(flat, id)
  const deleted = flat.filter((item) => toRemove.has(item.id))
  const next = flat.filter((item) => !toRemove.has(item.id))

  await saveThread(slug, next)

  // Delete from Supabase (cascade happens automatically)
  if (isOnline()) {
    await ensureAuth()
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Failed to delete from Supabase:', error)
    }
  }

  return deleted
}

// Restore comments
export async function restoreComments(slug, comments) {
  const current = await getThread(slug)
  const restored = [...current, ...comments]
  await saveThread(slug, restored)
}

// Edit comment
export async function editComment(slug, id, newBody) {
  const flat = await getThread(slug)
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

  await saveThread(slug, next)

  // Update in Supabase
  if (isOnline()) {
    await ensureAuth()
    const { error} = await supabase
      .from('reviews')
      .update({
        body: newBody,
        edited: true,
        edited_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      console.error('Failed to update in Supabase:', error)
    }
  }
}

// Subscribe to realtime updates
export function subscribeToThread(slug, callback) {
  if (!supabase) return () => {}

  const channel = supabase
    .channel(`reviews:${slug}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'reviews',
        filter: `slug=eq.${slug}`
      },
      async (payload) => {
        // Refresh thread from Supabase
        const updated = await getThreadFromSupabase(slug)
        if (updated) callback(updated)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

// Synchronous version for offline/no Supabase use (e.g., ForumsPage)
export function getThreadSync(slug) {
  const all = loadAll()
  const list = all[slug]
  return Array.isArray(list) ? list : []
}

export function getThreadStatsSync(slug) {
  const flat = getThreadSync(slug)
  if (flat.length === 0) return { count: 0, lastAt: null }
  let lastAt = flat[0].at
  for (const item of flat) {
    if (item.at > lastAt) lastAt = item.at
  }
  return { count: flat.length, lastAt }
}

export async function getThreadStats(slug) {
  const flat = await getThread(slug)
  if (flat.length === 0) return { count: 0, lastAt: null }
  let lastAt = flat[0].at
  for (const item of flat) {
    if (item.at > lastAt) lastAt = item.at
  }
  return { count: flat.length, lastAt }
}

export async function getAllSlugStats(slugs) {
  const out = {}
  for (const slug of slugs) {
    out[slug] = await getThreadStats(slug)
  }
  return out
}
