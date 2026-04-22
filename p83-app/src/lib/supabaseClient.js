import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing - running in offline mode')
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Auto-sign in anonymous users
export async function ensureAuth() {
  if (!supabase) return null

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    const { data, error } = await supabase.auth.signInAnonymously()
    if (error) {
      console.error('Anonymous auth failed:', error)
      return null
    }
    return data.session
  }

  return session
}

// Check if online
export function isOnline() {
  return navigator.onLine && supabase !== null
}
