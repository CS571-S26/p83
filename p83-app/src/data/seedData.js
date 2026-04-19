// Seed data for reviews and comments to make forums look active
// This creates realistic community activity across all destinations

function generateId() {
  return `seed-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

// Helper to create dates in the past
function daysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

function hoursAgo(hours) {
  const date = new Date()
  date.setHours(date.getHours() - hours)
  return date.toISOString()
}

export const SEED_REVIEWS = {
  'mount-kilimanjaro': [
    {
      id: generateId(),
      slug: 'mount-kilimanjaro',
      parentId: null,
      authorId: 'seed-user-1',
      visitorName: 'Marcus Johnson',
      rating: 5,
      season: 'Dry season',
      body: 'Summit night was brutal but standing on the roof of Africa at sunrise made it all worthwhile. The Machame route is challenging but scenic. Our guides were exceptional and really knew how to pace us for altitude.',
      at: hoursAgo(12),
    },
    {
      id: generateId(),
      slug: 'mount-kilimanjaro',
      parentId: null,
      authorId: 'seed-user-2',
      visitorName: 'Sophie Laurent',
      rating: 4,
      season: 'Dry season',
      body: 'Climbed via the Lemosho route in September. More expensive but less crowded and better acclimatization. The diverse ecosystems from rainforest to alpine desert are fascinating. Pole pole (slowly slowly) is the key!',
      at: daysAgo(4),
    },
    {
      id: generateId(),
      slug: 'mount-kilimanjaro',
      parentId: null,
      authorId: 'seed-user-3',
      visitorName: 'James Chen',
      rating: 5,
      season: 'Dry season',
      body: 'Life-changing experience! The camaraderie among trekkers and the support from porters and guides made this special. Uhuru Peak at 19,341 feet is no joke - train hard and trust the process.',
      at: daysAgo(11),
    },
  ],

  'poon-hill': [
    {
      id: generateId(),
      slug: 'poon-hill',
      parentId: null,
      authorId: 'seed-user-4',
      visitorName: 'Rachel Green',
      rating: 5,
      season: 'Fall',
      body: 'Perfect short trek for those with limited time! The sunrise view over the Annapurna and Dhaulagiri ranges is absolutely spectacular. Tea houses are cozy and the food is surprisingly good.',
      at: hoursAgo(6),
    },
    {
      id: generateId(),
      slug: 'poon-hill',
      parentId: null,
      authorId: 'seed-user-5',
      visitorName: 'Amit Sharma',
      rating: 5,
      season: 'Spring',
      body: 'Did this trek in March and the rhododendron forests were in full bloom - absolutely magical! The trail is well-maintained and suitable for beginners. Highly recommend staying in Ghorepani the night before summit.',
      at: daysAgo(3),
    },
    {
      id: generateId(),
      slug: 'poon-hill',
      parentId: null,
      authorId: 'seed-user-6',
      visitorName: 'Emma Wilson',
      rating: 4,
      season: 'Fall',
      body: 'Great introduction to Himalayan trekking. The 3am wake-up for sunrise is worth it! Bring warm layers - it gets cold at the viewpoint. The local Gurung culture and villages add so much to the experience.',
      at: daysAgo(8),
    },
  ],

  'acatenango-volcano': [
    {
      id: generateId(),
      slug: 'acatenango-volcano',
      parentId: null,
      authorId: 'seed-user-7',
      visitorName: 'Carlos Rodriguez',
      rating: 5,
      season: 'Dry season',
      body: 'Camping on an active volcano and watching Fuego erupt every 10-15 minutes is surreal! The night hike is challenging but the lava show is worth every step. Bring extra warm gear - it drops below freezing at night.',
      at: hoursAgo(18),
    },
    {
      id: generateId(),
      slug: 'acatenango-volcano',
      parentId: null,
      authorId: 'seed-user-8',
      visitorName: 'Lisa Anderson',
      rating: 5,
      season: 'Dry season',
      body: 'One of the most memorable hikes of my life! Watching lava explosions from Volcán de Fuego while camping at 3,976m is incredible. The sunrise was cloudy but the night show made up for it. Book with a reputable company!',
      at: daysAgo(2),
    },
    {
      id: generateId(),
      slug: 'acatenango-volcano',
      parentId: null,
      authorId: 'seed-user-9',
      visitorName: 'Miguel Santos',
      rating: 4,
      season: 'Dry season',
      body: 'Challenging but doable for anyone in decent shape. The final push to the summit is steep and sandy. Fuego was very active when we went - saw at least 30 eruptions! Rent good sleeping bags, it gets COLD.',
      at: daysAgo(7),
    },
  ],

  'quilotoa-crater-lake': [
    {
      id: generateId(),
      slug: 'quilotoa-crater-lake',
      parentId: null,
      authorId: 'seed-user-10',
      visitorName: 'Sarah Martinez',
      rating: 5,
      season: 'Dry season',
      body: 'That turquoise water in the crater is unreal! The loop hike around the rim takes 4-5 hours with stunning views. Going down to the lake is easy, coming back up at altitude is tough. Consider mule rides if needed.',
      at: hoursAgo(8),
    },
    {
      id: generateId(),
      slug: 'quilotoa-crater-lake',
      parentId: null,
      authorId: 'seed-user-11',
      visitorName: 'David Kim',
      rating: 4,
      season: 'Dry season',
      body: 'Beautiful volcanic crater lake at 3,914m. The color changes throughout the day. We hiked from Quilotoa to Chugchilán - a great multi-day trek through indigenous villages. Bring cash for entrance fees and lodging.',
      at: daysAgo(5),
    },
    {
      id: generateId(),
      slug: 'quilotoa-crater-lake',
      parentId: null,
      authorId: 'seed-user-12',
      visitorName: 'Ana Silva',
      rating: 5,
      season: 'Dry season',
      body: 'The Quilotoa Loop is Ecuador\'s hidden gem! We did the 3-day trek village to village. Each morning brought new landscapes. The local Quechua communities are welcoming. Stay in family-run hostels for authentic experience.',
      at: daysAgo(13),
    },
  ],

  'ala-kul-lake': [
    {
      id: generateId(),
      slug: 'ala-kul-lake',
      parentId: null,
      authorId: 'seed-user-13',
      visitorName: 'Alex Turner',
      rating: 5,
      season: 'Summer',
      body: 'The most stunning alpine lake I\'ve ever seen! That deep blue color against snow-capped peaks is breathtaking. The pass at 3,860m is steep but manageable. Best done July-September when snow has melted.',
      at: hoursAgo(15),
    },
    {
      id: generateId(),
      slug: 'ala-kul-lake',
      parentId: null,
      authorId: 'seed-user-14',
      visitorName: 'Nina Petrov',
      rating: 5,
      season: 'Summer',
      body: 'Kyrgyzstan\'s best trek! The 3-day loop through Karakol valley is spectacular. Camped at the lake - cold but incredible. Horses can carry your gear. The nomadic culture and hospitality are unforgettable.',
      at: daysAgo(6),
    },
  ],

  'machu-picchu': [
    {
      id: generateId(),
      slug: 'machu-picchu',
      parentId: null,
      authorId: 'seed-user-15',
      visitorName: 'Carlos Martinez',
      rating: 5,
      season: 'Dry season',
      body: 'The classic Inca Trail is worth every step! Watching sunrise at the Sun Gate overlooking Machu Picchu was magical. Book permits at least 6 months in advance - they sell out fast. Porters and cooks made the experience amazing.',
      at: hoursAgo(6),
    },
    {
      id: generateId(),
      slug: 'machu-picchu',
      parentId: null,
      authorId: 'seed-user-16',
      visitorName: 'Jennifer Park',
      rating: 4,
      season: 'Dry season',
      body: 'Amazing trek but very crowded in July. The archaeological sites along the way are fascinating. Dead Woman\'s Pass is challenging but doable. Tip your porters well - they carry so much and still smile!',
      at: daysAgo(1),
    },
    {
      id: generateId(),
      slug: 'machu-picchu',
      parentId: null,
      authorId: 'seed-user-17',
      visitorName: 'David Thompson',
      rating: 5,
      season: 'Dry season',
      body: 'Best hiking experience of my life. The combination of nature, history, and challenge is perfect. Spent extra time in Cusco for acclimatization - definitely recommend. The ruins at Wiñay Wayna are almost as impressive as Machu Picchu itself.',
      at: daysAgo(8),
    },
  ],

  'samarian-gorge': [
    {
      id: generateId(),
      slug: 'samarian-gorge',
      parentId: null,
      authorId: 'seed-user-18',
      visitorName: 'Maria Papadopoulos',
      rating: 5,
      season: 'Summer',
      body: 'The longest gorge in Europe is spectacular! 16km downhill hike through stunning landscapes. The Iron Gates narrowest point is incredible - 3m wide with 300m walls! Ended at the beach in Agia Roumeli. Perfect day trip.',
      at: hoursAgo(10),
    },
    {
      id: generateId(),
      slug: 'samarian-gorge',
      parentId: null,
      authorId: 'seed-user-19',
      visitorName: 'Thomas Schmidt',
      rating: 4,
      season: 'Spring',
      body: 'Beautiful hike in late May. Still had water flowing which made it more scenic. Start early to avoid crowds. The wooden walkways through the gorge are well-maintained. Saw the wild Cretan goats (kri-kri)!',
      at: daysAgo(4),
    },
  ],

  'mount-democrat': [
    {
      id: generateId(),
      slug: 'mount-democrat',
      parentId: null,
      authorId: 'seed-user-20',
      visitorName: 'Amanda Foster',
      rating: 4,
      season: 'Summer',
      body: 'Great 14er for beginners! Started at 4am to avoid afternoon thunderstorms. The summit views of the surrounding peaks are incredible. Bring trekking poles for the loose scree. Did Cameron and Lincoln after - the Decalibron loop is awesome!',
      at: daysAgo(9),
    },
  ],
}

// Add some replies to make conversations
export const SEED_REPLIES = {
  'mount-kilimanjaro': [
    {
      id: generateId(),
      slug: 'mount-kilimanjaro',
      parentId: null,
      parentName: 'Marcus Johnson',
      authorId: 'seed-user-21',
      visitorName: 'Emily Rodriguez',
      rating: null,
      season: '',
      body: 'Thanks for sharing! Which company did you use for your trek? Looking for reliable recommendations.',
      at: hoursAgo(8),
    },
    {
      id: generateId(),
      slug: 'mount-kilimanjaro',
      parentId: null,
      parentName: 'Sophie Laurent',
      authorId: 'seed-user-22',
      visitorName: 'Kevin O\'Brien',
      rating: null,
      season: '',
      body: 'How much extra was the Lemosho route compared to Machame? Trying to budget for my trip next year.',
      at: daysAgo(3),
    },
  ],
  'poon-hill': [
    {
      id: generateId(),
      slug: 'poon-hill',
      parentId: null,
      parentName: 'Rachel Green',
      authorId: 'seed-user-23',
      visitorName: 'Priya Gupta',
      rating: null,
      season: '',
      body: 'How many days did you spend total? Trying to plan my itinerary!',
      at: hoursAgo(4),
    },
  ],
  'acatenango-volcano': [
    {
      id: generateId(),
      slug: 'acatenango-volcano',
      parentId: null,
      parentName: 'Carlos Rodriguez',
      authorId: 'seed-user-24',
      visitorName: 'Julia Peterson',
      rating: null,
      season: '',
      body: 'This looks amazing! Did you need any special equipment besides warm clothes?',
      at: hoursAgo(16),
    },
  ],
  'quilotoa-crater-lake': [
    {
      id: generateId(),
      slug: 'quilotoa-crater-lake',
      parentId: null,
      parentName: 'Sarah Martinez',
      authorId: 'seed-user-25',
      visitorName: 'Miguel Torres',
      rating: null,
      season: '',
      body: 'Can you kayak on the lake? Saw some photos online but wasn\'t sure if it\'s allowed.',
      at: hoursAgo(6),
    },
  ],
  'ala-kul-lake': [
    {
      id: generateId(),
      slug: 'ala-kul-lake',
      parentId: null,
      parentName: 'Alex Turner',
      authorId: 'seed-user-26',
      visitorName: 'Anna Ivanova',
      rating: null,
      season: '',
      body: 'Did you hire a guide or go independently? First time trekking in Kyrgyzstan and not sure what\'s best.',
      at: hoursAgo(12),
    },
  ],
  'machu-picchu': [
    {
      id: generateId(),
      slug: 'machu-picchu',
      parentId: null,
      parentName: 'Carlos Martinez',
      authorId: 'seed-user-27',
      visitorName: 'Laura Chen',
      rating: null,
      season: '',
      body: 'How far in advance should I book to get permits for May? Heard it\'s competitive!',
      at: hoursAgo(4),
    },
  ],
  'samarian-gorge': [
    {
      id: generateId(),
      slug: 'samarian-gorge',
      parentId: null,
      parentName: 'Maria Papadopoulos',
      authorId: 'seed-user-28',
      visitorName: 'Oliver Brown',
      rating: null,
      season: '',
      body: 'Is the ferry back from Agia Roumeli included or do you need to book separately?',
      at: hoursAgo(8),
    },
  ],
}

// Function to apply seed data to localStorage
export function applySeedData() {
  const existingData = localStorage.getItem('bb-basecamp-reviews')

  // Only apply if no data exists
  if (existingData) {
    const parsed = JSON.parse(existingData)
    const hasData = Object.keys(parsed).some((key) => parsed[key] && parsed[key].length > 0)
    if (hasData) {
      return false
    }
  }

  const allReviews = {}

  // Add main reviews
  Object.keys(SEED_REVIEWS).forEach((slug) => {
    allReviews[slug] = [...SEED_REVIEWS[slug]]
  })

  // Add replies (matching parentId to actual review IDs)
  Object.keys(SEED_REPLIES).forEach((slug) => {
    const replies = SEED_REPLIES[slug]
    const reviews = allReviews[slug] || []

    replies.forEach((reply) => {
      // Find parent review by visitor name
      const parent = reviews.find((r) => r.visitorName === reply.parentName && r.parentId === null)
      if (parent) {
        const replyWithParent = { ...reply, parentId: parent.id }
        delete replyWithParent.parentName
        reviews.push(replyWithParent)
      }
    })

    allReviews[slug] = reviews
  })

  // Save to localStorage
  localStorage.setItem('bb-basecamp-reviews', JSON.stringify(allReviews))

  // Add some votes
  const votes = {}
  Object.keys(allReviews).forEach((slug) => {
    allReviews[slug].forEach((review, index) => {
      // Make popular reviews more voted
      if (review.rating >= 4 || index === 0) {
        const voteCount = Math.floor(Math.random() * 12) + 3 // 3-14 votes
        votes[review.id] = {
          count: voteCount,
          voters: Array.from({ length: voteCount }, (_, i) => `voter-${i}-${review.id}`),
        }
      }
    })
  })

  localStorage.setItem('bb-basecamp-votes', JSON.stringify(votes))

  return true
}
