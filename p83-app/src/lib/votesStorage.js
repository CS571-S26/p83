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

export function addVote(reviewId, userId) {
  const votes = getVotes()
  if (!votes[reviewId]) votes[reviewId] = { count: 0, voters: [] }
  if (!votes[reviewId].voters.includes(userId)) {
    votes[reviewId].voters.push(userId)
    votes[reviewId].count++
    saveVotes(votes)
    return true
  }
  return false
}

export function removeVote(reviewId, userId) {
  const votes = getVotes()
  if (!votes[reviewId]) return false
  const index = votes[reviewId].voters.indexOf(userId)
  if (index > -1) {
    votes[reviewId].voters.splice(index, 1)
    votes[reviewId].count = Math.max(0, votes[reviewId].count - 1)
    saveVotes(votes)
    return true
  }
  return false
}

export function hasVoted(reviewId, userId) {
  const votes = getVotes()
  return votes[reviewId]?.voters.includes(userId) || false
}

export function getVoteCount(reviewId) {
  const votes = getVotes()
  return votes[reviewId]?.count || 0
}
