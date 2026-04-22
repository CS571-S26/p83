import { supabase, ensureAuth } from './supabaseClient'
import { loadAll } from './reviewsStorage'
import { getVotes } from './votesStorage'

export async function migrateLocalDataToSupabase() {
  if (!supabase) {
    console.log('Supabase not configured, skipping migration')
    return
  }

  // Check if already migrated
  const migrated = localStorage.getItem('bb-migrated-to-supabase')
  if (migrated) {
    console.log('Already migrated to Supabase')
    return
  }

  console.log('Starting migration to Supabase...')

  await ensureAuth()

  // Migrate reviews
  const allReviews = loadAll()
  let reviewCount = 0

  for (const [slug, reviews] of Object.entries(allReviews)) {
    for (const review of reviews) {
      const { error } = await supabase.from('reviews').upsert({
        id: review.id,
        slug: review.slug,
        parent_id: review.parentId,
        author_id: review.authorId,
        visitor_name: review.visitorName,
        rating: review.rating,
        season: review.season,
        body: review.body,
        created_at: review.at,
        edited: review.edited || false,
        edited_at: review.editedAt
      }, { onConflict: 'id' })

      if (!error) reviewCount++
    }
  }

  // Migrate votes
  const allVotes = getVotes()
  let voteCount = 0

  for (const [reviewId, voteData] of Object.entries(allVotes)) {
    for (const voterId of voteData.voters) {
      const { error } = await supabase.from('votes').upsert({
        review_id: reviewId,
        voter_id: voterId
      }, { onConflict: 'review_id,voter_id' })

      if (!error) voteCount++
    }
  }

  console.log(`Migration complete: ${reviewCount} reviews, ${voteCount} votes`)
  localStorage.setItem('bb-migrated-to-supabase', 'true')
}
