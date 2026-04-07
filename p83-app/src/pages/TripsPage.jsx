import { Container, Row, Col } from 'react-bootstrap'
import TripCard from '../components/TripCard'

const SAMPLE_TRIPS = [
  {
    title: 'Mount Kilimanjaro',
    region: 'Tanzania, Africa',
    difficulty: 'Challenging',
    summary: 'High-altitude trek to Uhuru Peak with varied climate zones and strong acclimatization focus.',
  },
  {
    title: 'Poon Hill',
    region: 'Nepal, Asia',
    difficulty: 'Moderate',
    summary: 'Classic Annapurna foothills trek with sunrise views and teahouse culture.',
  },
  {
    title: 'Acatenango Volcano',
    region: 'Guatemala, Central America',
    difficulty: 'Challenging',
    summary: 'Steep volcanic ascent with optional views of neighboring Fuego.',
  },
]

function TripsPage() {
  return (
    <Container as="main" className="py-5">
      <h1 className="mb-3">Featured trips</h1>
      <p className="text-muted mb-4">
        A sample of destinations from the proposal. Full detail pages and filters will come in later
        milestones.
      </p>
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
