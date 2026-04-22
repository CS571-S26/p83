import { supabase, ensureAuth, isOnline } from './supabaseClient'

const VOTES_KEY = 'bb-basecamp-votes'

export function getVotes() {
  try {
    const raw = localStorage.getItem(VOTES_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function saveVotes(votes) {
  try {
    localStorage.setItem(VOTES_KEY, JSON.stringify(votes))
  } catch {
    /* quota exceeded */
  }
}

// Fetch votes from Supabase
export async function getVotesFromSupabase() {
  if (!isOnline()) return null

  await ensureAuth()

  const { data, error } = await supabase
    .from('votes')
    .select('review_id, voter_id')

  if (error) {
    console.error('Failed to fetch votes:', error)
    return null
  }

  // Convert to app format
  const votes = {}
  for (const vote of data) {
    if (!votes[vote.review_id]) {
      votes[vote.review_id] = { count: 0, voters: [] }
    }
    votes[vote.review_id].voters.push(vote.voter_id)
    votes[vote.review_id].count++
  }

  return votes
}

export async function addVote(reviewId, userId) {
  // Check localStorage first
  const votes = getVotes()
  if (!votes[reviewId]) votes[reviewId] = { count: 0, voters: [] }

  if (votes[reviewId].voters.includes(userId)) {
    return false // Already voted
  }

  votes[reviewId].voters.push(userId)
  votes[reviewId].count++
  saveVotes(votes)

  // Sync to Supabase
  if (isOnline()) {
    await ensureAuth()
    const { error } = await supabase
      .from('votes')
      .insert({ review_id: reviewId, voter_id: userId })

    if (error) {
      console.error('Failed to add vote to Supabase:', error)
    }
  }

  return true
}

export async function removeVote(reviewId, userId) {
  const votes = getVotes()
  if (!votes[reviewId]) return false

  const index = votes[reviewId].voters.indexOf(userId)
  if (index === -1) return false

  votes[reviewId].voters.splice(index, 1)
  votes[reviewId].count = Math.max(0, votes[reviewId].count - 1)
  saveVotes(votes)

  // Sync to Supabase
  if (isOnline()) {
    await ensureAuth()
    const { error } = await supabase
      .from('votes')
      .delete()
      .eq('review_id', reviewId)
      .eq('voter_id', userId)

    if (error) {
      console.error('Failed to remove vote from Supabase:', error)
    }
  }

  return true
}

export function hasVoted(reviewId, userId) {
  const votes = getVotes()
  return votes[reviewId]?.voters.includes(userId) || false
}

export function getVoteCount(reviewId) {
  const votes = getVotes()
  return votes[reviewId]?.count || 0
}

// Subscribe to vote changes
export function subscribeToVotes(reviewIds, callback) {
  if (!supabase || reviewIds.length === 0) return () => {}

  const channel = supabase
    .channel('votes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'votes'
      },
      async () => {
        // Refresh votes from Supabase
        const updated = await getVotesFromSupabase()
        if (updated) callback(updated)
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
