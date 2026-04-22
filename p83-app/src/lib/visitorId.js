import { supabase, ensureAuth } from './supabaseClient'

const KEY = 'bb-visitor-author-id'

function randomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `v-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

// Modified: Use Supabase user ID if available
export async function getOrCreateVisitorId() {
  // Try Supabase auth first
  if (supabase) {
    const session = await ensureAuth()
    if (session?.user?.id) {
      // Save to localStorage as cache
      localStorage.setItem(KEY, session.user.id)
      return session.user.id
    }
  }

  // Fallback: localStorage-based ID for offline
  try {
    let id = localStorage.getItem(KEY)
    if (id) return id

    id = randomId()
    localStorage.setItem(KEY, id)
    return id
  } catch {
    return randomId()
  }
}
