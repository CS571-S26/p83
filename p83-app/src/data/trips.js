/**
 * All destinations for Backpacking Basecamp.
 * continent: filter key for Trips page (africa | asia | americas | europe)
 * tripType: summit | volcano | lake | gorge | 14er
 */

export const TRIPS = [
  {
    slug: 'mount-kilimanjaro',
    name: 'Mount Kilimanjaro',
    country: 'Tanzania',
    regionLabel: 'Tanzania, Africa',
    continent: 'africa',
    pillRegion: 'africa',
    continentLabel: 'Africa',
    difficulty: 'Challenging',
    tripType: 'summit',
    elevationM: 5895,
    elevationDisplay: '5,895 m',
    routeNote: 'Lemosho route',
    bestSeason: 'January to March and June through October (dry windows)',
    imageUrl:
      'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&h=500&fit=crop&q=80',
    teaser:
      'Rainforest gives way to moorland, then a stark alpine desert before the final push to Uhuru Peak. Summit night is cold, slow, and unforgettable.',
    description: [
      'The Lemosho approach spreads acclimatization across several days, which helps on a mountain where altitude hits harder than the grades suggest.',
      'Above the Shira Plateau the landscape turns lunar; ice caps glint at dawn while the savanna lies thousands of metres below.',
    ],
    report: [
      'We started in montane forest where colobus monkeys moved through the canopy and guides set a deliberately conservative pace. Each camp climbed a little higher than the last, with the rule of sleeping low when possible broken only where the route demanded it.',
      'The night summit bid began under headlamps on scree and frozen grit. Breathing at nearly 6000 metres feels thin; every step is a negotiation between will and pulse. The crater rim arrived as a pale line, then the sun lifted over the ice and the entire African plain seemed to unroll below.',
      'Descending the same day tests knees and focus, but dropping elevation brings oxygen back fast. Back in Moshi, chai tastes sharper and sleep comes deep. Kilimanjaro is as much a logistics and pacing puzzle as it is a climb.',
      'If I did it again I would budget one more rest day at high camp, carry a warmer down layer for the standstill at Stella Point, and book a lodge with a real shower before the flight out.',
    ],
    gear: [
      'Four-season down jacket and insulated pants for summit block',
      'Gaiters and stiff-soled boots for scree and cold',
      'Trekking poles with snow baskets',
      'Headlamp plus spare batteries (cold drains fast)',
      'Wide-brim hat and SPF 50+ for equatorial UV',
      '3-litre hydration capacity and electrolyte tablets',
    ],
  },
  {
    slug: 'poon-hill',
    name: 'Poon Hill',
    country: 'Nepal',
    regionLabel: 'Nepal, Asia',
    continent: 'asia',
    pillRegion: 'asia',
    continentLabel: 'Asia',
    difficulty: 'Moderate',
    tripType: 'summit',
    elevationM: 3210,
    elevationDisplay: '3,210 m',
    routeNote: 'Annapurna teahouse loop',
    bestSeason: 'October to November and March to April',
    imageUrl:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=500&fit=crop&q=80',
    teaser:
      'A short, steep morning climb from Ghorepani rewards you with a 360-degree wall of summits when the sky clears at sunrise.',
    description: [
      'Teahouse trekking means dal bhat, shared tables, and trails that smell of pine and woodsmoke.',
      'Poon Hill is a viewpoint, not a technical climb, but the vertical gain from the lodges still wakes your legs before breakfast.',
    ],
    report: [
      'We looped through rhododendron forest after Pokhara, staying in family-run lodges where owners tracked weather by ear. The trail to Ghorepani is stone steps and switchbacks; porters passed with impossible loads while we sweated under daypacks.',
      'The alarm for Poon Hill goes off in the dark. Headlamps bob up the ridge like a line of fireflies. At the top, Annapurna South and Dhaulagiri catch the first light while mist still clings to the valleys. It is crowded, yes, but the scale justifies the queue.',
      'Descending toward Ghandruk, terraces and slate roofs replace the high forest. Kids run beside trekkers practicing English; tea grows colder as clouds roll in. The Annapurna foothills feel lived-in in a way alpine routes rarely do.',
      'Monsoon months bring leeches and slick stone; winter can ice the steps toward the viewpoint. I would avoid July and August unless you enjoy mud and opaque views.',
    ],
    gear: [
      'Layering system: light fleece, wind shell, and packable down',
      'Trekking shoes with aggressive tread (trail is often wet)',
      'Quick-dry shirts and a warm hat for the summit push',
      'Water purification drops or filter for refills',
      'Cash in small notes for tea stops',
      'Buff or neck gaiter for dust on jeep roads',
    ],
  },
  {
    slug: 'acatenango-volcano',
    name: 'Acatenango Volcano',
    country: 'Guatemala',
    regionLabel: 'Guatemala, Central America',
    continent: 'americas',
    pillRegion: 'central-america',
    continentLabel: 'Central America',
    difficulty: 'Challenging',
    tripType: 'volcano',
    elevationM: 3976,
    elevationDisplay: '3,976 m',
    routeNote: 'Overnight camp with Fuego views',
    bestSeason: 'November through April',
    imageUrl:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop&q=80',
    teaser:
      'Camp above the treeline puts you eye-level with ash plumes from neighbouring Fuego while the Antigua valley glows far below.',
    description: [
      'The climb is a grind of volcanic ash and switchbacks; altitude arrives faster than your legs expect.',
      'Night brings cold wind and the rumble of distant eruptions, a reminder that this range is still very much alive.',
    ],
    report: [
      'We left Antigua in a shuttle before dawn, hiking through farmland until the trail steepened into loose scree. Porters offered to carry tents; most of us kept loads light enough to haul our own. The forest belt ends abruptly; above it, the world turns grey and exposed.',
      'Base camp sits on a shoulder with a direct sightline to Volcán de Fuego. After dark, red ribbons of lava trace the skyline whenever the crater clears. Sleep is fitful between wind gusts and the low-frequency boom of the earth clearing its throat.',
      'Summit morning is a slog in frozen gravel. Gloves matter; so does patience. The true summit of Acatenango is often skipped for time, but the high camp ridge already delivers the show most people came for.',
      'Carry a four-season bag and a liner. Renting gear in town works, but check zippers and down loft before you commit.',
    ],
    gear: [
      '0°F or -10°C rated sleeping bag',
      'Insulated jacket, hard shell, and warm gloves',
      'Goggles or sunglasses for windblown ash',
      'Headlamp with red mode for camp etiquette',
      'Trekking poles for the descent on loose soil',
      'Thick socks and blister kit',
    ],
  },
  {
    slug: 'quilotoa-crater-lake',
    name: 'Quilotoa Crater Lake',
    country: 'Ecuador',
    regionLabel: 'Ecuador, South America',
    continent: 'americas',
    pillRegion: 'south-america',
    continentLabel: 'South America',
    difficulty: 'Moderate',
    tripType: 'lake',
    elevationM: 3914,
    elevationDisplay: '3,914 m',
    routeNote: 'Crater rim circuit',
    bestSeason: 'June to September (drier highlands)',
    imageUrl:
      'https://images.unsplash.com/photo-1580654843061-8c90a9e4e1a0?w=800&h=500&fit=crop&q=80',
    teaser:
      'Mineral-blue water fills an emerald caldera; the rim trail traces pasture, wind, and occasional mist that erases the drop below.',
    description: [
      'The loop can be done as a day walk from the viewpoint village or linked with the Quilotoa trek for a longer approach through Andean communities.',
      'Altitude and wind make it feel bigger than the mileage suggests; llamas and woven goods appear at every saddle.',
    ],
    report: [
      'We approached from Chugchilan after two days of dirt roads and ridge walking. Quilotoa appeared suddenly, a disc of colour too saturated to feel real. Local kids offered photo poses with lambs; the wind carried the smell of woodsmoke from kitchens below the rim.',
      'The descent to the lake is knee-punishing; the climb back is worse if you are not acclimatized. Kayaks sit on the shore on calm days, but the water is cold enough to remind you this is still a high volcano, not a beach.',
      'Weather turns in minutes. One hour of sun, then fog that erases the far rim. Carry a shell and expect mud if you shortcut livestock paths.',
      'Staying in a community hostel spreads income beyond the bus-stop mirador. Ask before photographing people or weaving studios.',
    ],
    gear: [
      'Waterproof shell and warm midlayer',
      'Sun hat and lip balm (UV is fierce at altitude)',
      'Sturdy shoes with ankle support for the descent',
      'Cash for community fees and snacks',
      'Trekking poles for the climb out',
      'Camera with a lens cloth (spray off the lake)',
    ],
  },
  {
    slug: 'ala-kul-lake',
    name: 'Ala Kul Lake',
    country: 'Kyrgyzstan',
    regionLabel: 'Kyrgyzstan, Central Asia',
    continent: 'asia',
    pillRegion: 'asia',
    continentLabel: 'Asia',
    difficulty: 'Challenging',
    tripType: 'lake',
    elevationM: 3532,
    elevationDisplay: '3,532 m',
    routeNote: 'High alpine lake crossing',
    bestSeason: 'July to September (passes open)',
    imageUrl:
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=500&fit=crop&q=80',
    teaser:
      'Turquoise water sits in a cirque of broken rock; the pass approach is loose, steep, and worth every scraped knuckle.',
    description: [
      'The trek links jailoo pastures with a glacial pass and a freezing swim for the brave.',
      'Horses can carry gear to camp, but the pass itself is on foot, often in wind that feels imported from the steppe.',
    ],
    report: [
      'We started from Karakol, sleeping in yurt camps where families served bread straight from the oven. Rivers ran grey with silt; horses grazed on slopes that looked too steep to stand on. Guides timed the pass for morning stability before afternoon clouds built.',
      'Ala Kul sits like a jewel in a bowl of scree. Some hikers strip to swim; most dip a hand and call it enough. The descent toward Altyn Arashan hot springs is long, knee-heavy, and fragrant with juniper when the wind shifts.',
      'This is not a route for people who need manicured trails. Cairns mark the way, but judgement matters in fog. Respect the weather window; the pass has turned groups around in July snow.',
      'Learning a few Kyrgyz phrases goes further than Russian in the eastern valleys. Tip guides and horsemen fairly; the season is short.',
    ],
    gear: [
      'Mountaineering boots or stiff trekking boots',
      'Gloves and warm hat for the pass',
      'Tent or confirm yurt bookings in advance',
      'Water filter and wide-mouth bottle (streams are silty)',
      'Gaiters for snow patches early season',
      'Down jacket for camp after sunset',
    ],
  },
  {
    slug: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    regionLabel: 'Peru, South America',
    continent: 'americas',
    pillRegion: 'south-america',
    continentLabel: 'South America',
    difficulty: 'Moderate',
    tripType: 'summit',
    elevationM: 2430,
    elevationDisplay: '2,430 m',
    routeNote: 'Inca Trail approach',
    bestSeason: 'May to September (dry season)',
    imageUrl:
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=500&fit=crop&q=80',
    teaser:
      'Stone terraces step down into cloud forest; the citadel appears across a final saddle like a withheld secret.',
    description: [
      'Permits limit foot traffic, but the classic four-day approach still feels like a pilgrimage when mist wraps the ruins.',
      'Altitude on Dead Woman\'s Pass is real; Cusco acclimatization days pay off before you shoulder your pack.',
    ],
    report: [
      'We spent two nights in Cusco walking stairs and drinking coca tea before the bus to km 82. Porters ran past with aluminium kitchen kits while we learned to pace breath on Inca stairs that ignore switchback logic.',
      'Camp nights were cold enough for down jackets; days burned UV through cloud. Phuyupatamarca offered the first long view of the Urubamba gorge, green and impossibly deep.',
      'Machu Picchu at dawn is managed chaos: buses, guides, and one iconic viewpoint. Still, when light hits Huayna Picchu and the mist lifts, the effort compresses into a single frame you will revisit for years.',
      'Book permits months ahead. Respect rope closures; erosion is a bigger threat than crowds in some zones.',
    ],
    gear: [
      'Broken-in boots with ankle support for stone stairs',
      'Rain jacket and pack cover (microclimates shift fast)',
      'Sun protection and insect repellent in cloud forest',
      'Headlamp for early camp starts',
      'Snacks you actually want to eat at altitude',
      'Lightweight down or synthetic puffy for camps',
    ],
  },
  {
    slug: 'samarian-gorge',
    name: 'Samarian Gorge',
    country: 'Greece',
    regionLabel: 'Crete, Europe',
    continent: 'europe',
    pillRegion: 'europe',
    continentLabel: 'Europe',
    difficulty: 'Easy',
    tripType: 'gorge',
    elevationM: 1250,
    elevationDisplay: '1,250 m',
    routeNote: "Europe's longest gorge hike",
    bestSeason: 'April to June and September to October',
    imageUrl:
      'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&h=500&fit=crop&q=80',
    teaser:
      'Limestone walls narrow until sky is a ribbon; goats clatter on ledges while the riverbed guides your feet downhill.',
    description: [
      'The hike is mostly downhill from Xyloskalo, ending at Agia Roumeli on the Libyan Sea.',
      'Heat builds fast in summer; start early and carry more water than the distance suggests.',
    ],
    report: [
      'We caught the dawn bus from Chania, entering the national park as light touched the cliff tops. The first kilometres are forested and cool; soon the gorge tightens until you are walking between vertical slabs hundreds of metres high.',
      'Rest stops appear at widened bends where springs sometimes run. In high season, the path feels like a polite queue; in shoulder months, you hear more birds than voices.',
      'Agia Roumeli means a swim, a taverna, and a ferry connection unless you arrange a pickup. Feet swell after sixteen kilometres of stone; sandals in the pack are worth the grams.',
      'Check bus and boat schedules the day before; strikes and weather can shuffle timetables without much warning.',
    ],
    gear: [
      'Sturdy trail shoes with good grip on wet limestone',
      'Two litres of water minimum; more in July or August',
      'Sun hat and electrolytes',
      'Swim layer for the sea at the exit',
      'Cash for tavernas and small boat tickets',
      'Trekking poles optional on tired knees',
    ],
  },
  {
    slug: 'mount-democrat',
    name: 'Mount Democrat',
    country: 'USA',
    regionLabel: 'Colorado, USA',
    continent: 'americas',
    pillRegion: 'north-america',
    continentLabel: 'North America',
    difficulty: 'Moderate',
    tripType: '14er',
    elevationM: 4314,
    elevationDisplay: '4,314 m',
    routeNote: 'Colorado 14er, tundra ridge',
    bestSeason: 'July to September (snow melts, monsoon afternoons)',
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop&q=80',
    teaser:
      'Above Kite Lake, a steepening path breaks into tundra and talus; the summit block is short but airy with views across the Mosquito Range.',
    description: [
      'Democrat is often linked with Lincoln and Bross in a long day, but it stands alone as a sharp introduction to Colorado altitude.',
      'Afternoon lightning is the real hazard; start before dawn and be down by noon when storms build.',
    ],
    report: [
      'We camped at Kite Lake under a hard frost, starting headlamps at 4 a.m. The trail to the saddle is a grind of switchbacks; above treeline the wind found every zipper gap. Pikas chirped from boulder fields while we layered up for the final ridge.',
      'The summit is small; respect spacing when others are on the block. To the west, the Ten Mile Range cuts a jagged horizon; to the east, high prairie rolls toward the Great Plains.',
      'Descent is where people rush; we watched a roll cloud build by 11 a.m. and jogged the scree before thunder cracked. Democrat teaches the same lesson as every 14er: the clock matters more than ego.',
      'Check private-land closures on adjacent peaks; routes change with ownership. Carry the ten essentials; SAR is volunteer-heavy up here.',
    ],
    gear: [
      'Insulating layers and waterproof shell',
      'Lightning-aware schedule (start early)',
      'Trekking poles for scree descent',
      'Sunscreen and lip balm above treeline',
      'Headlamp with fresh batteries',
      'Extra snacks and a filter for lake refill',
    ],
  },
]

export const CONTINENT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'africa', label: 'Africa' },
  { id: 'asia', label: 'Asia' },
  { id: 'americas', label: 'Americas' },
  { id: 'europe', label: 'Europe' },
]

export const DIFFICULTY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'Easy', label: 'Easy' },
  { id: 'Moderate', label: 'Moderate' },
  { id: 'Challenging', label: 'Challenging' },
]

export const TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'summit', label: 'Summit' },
  { id: 'volcano', label: 'Volcano' },
  { id: 'lake', label: 'Lake' },
  { id: 'gorge', label: 'Gorge' },
  { id: '14er', label: '14er' },
]

export const FEATURED_SLUGS = ['mount-kilimanjaro', 'acatenango-volcano', 'ala-kul-lake']

/** Home page continent explorer cards (links use ?pill= for Trips filter). */
export const HOME_CONTINENT_CARDS = [
  {
    pillRegion: 'africa',
    title: 'Africa',
    count: 1,
    imageUrl: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=600&q=80',
  },
  {
    pillRegion: 'asia',
    title: 'Asia',
    count: 2,
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80',
  },
  {
    pillRegion: 'central-america',
    title: 'Central America',
    count: 1,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    pillRegion: 'south-america',
    title: 'South America',
    count: 2,
    imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80',
  },
  {
    pillRegion: 'europe',
    title: 'Europe',
    count: 1,
    imageUrl: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&q=80',
  },
  {
    pillRegion: 'north-america',
    title: 'North America',
    count: 1,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
  },
]

export function getTripBySlug(slug) {
  return TRIPS.find((t) => t.slug === slug)
}

export function filterTrips(trips, { continent, difficulty, tripType, pillRegion }) {
  return trips.filter((t) => {
    if (pillRegion && pillRegion !== 'all') {
      if (t.pillRegion !== pillRegion) return false
    } else if (continent && continent !== 'all' && t.continent !== continent) {
      return false
    }
    if (difficulty && difficulty !== 'all' && t.difficulty !== difficulty) return false
    if (tripType && tripType !== 'all' && t.tripType !== tripType) return false
    return true
  })
}
