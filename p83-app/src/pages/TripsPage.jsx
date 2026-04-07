import { Container, Row, Col } from 'react-bootstrap'
import TripCard from '../components/TripCard'

const SAMPLE_TRIPS = [
  {
    title: 'Mount Kilimanjaro',
    region: 'Tanzania, Africa',
    difficulty: 'Challenging',
    summary:
      'I want this page to cover my Lemosho route, acclimatization days, and what I packed for summit night.',
  },
  {
    title: 'Poon Hill',
    region: 'Nepal, Asia',
    difficulty: 'Moderate',
    summary:
      'Teahouse trekking with a sunrise push—good for comparing monsoon vs. dry season windows.',
  },
  {
    title: 'Acatenango Volcano',
    region: 'Guatemala, Central America',
    difficulty: 'Challenging',
    summary:
      'Steep volcanic ascent; I will add notes on pacing, cold layers, and camp logistics near Fuego.',
  },
]

function TripsPage() {
  return (
    <Container as="main" className="bb-root py-4">
      <header className="bb-page-intro">
        <p className="bb-eyebrow text-uppercase mb-2">Destinations</p>
        <h1 className="h2 mb-3">Featured trips</h1>
        <p className="bb-lead-trips mb-0">
          Three places from my proposal to anchor the trip pages. I will add galleries, stats, and
          gear lists as I build each route.
        </p>
      </header>

      <Row className="g-4">
        {SAMPLE_TRIPS.map((trip) => (
          <Col key={trip.title} md={6} lg={4}>
            <TripCard
              title={trip.title}
              region={trip.region}
              difficulty={trip.difficulty}
              summary={trip.summary}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default TripsPage
