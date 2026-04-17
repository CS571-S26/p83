const KEY = 'bb-visitor-author-id'

function randomId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `v-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function getOrCreateVisitorId() {
  try {
    let id = localStorage.getItem(KEY)
    if (!id) {
      id = randomId()
      localStorage.setItem(KEY, id)
    }
    return id
  } catch {
    return randomId()
  }
}
