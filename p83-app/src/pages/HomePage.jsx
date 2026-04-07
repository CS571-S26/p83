import { Link } from 'react-router-dom'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import heroImg from '../assets/hero.png'

function HomePage() {
  return (
    <Container as="main" className="bb-root py-4">
      <header className="bb-header">
        <p className="bb-eyebrow text-uppercase text-muted mb-2">Field notes</p>
        <h1 className="bb-title">Backpacking Basecamp</h1>
        <p className="bb-subtitle">
          I write up treks I have done across six continents—summits, volcanoes, gorges, and high
          lakes—with photos, difficulty, elevation, and gear that actually worked.
        </p>
      </header>

      <Row className="align-items-stretch g-4">
        <Col lg={6}>
          <div className="overflow-hidden rounded-3 shadow-sm h-100">
            <Image
              src={heroImg}
              alt="Mountain ridge above clouds"
              className="bb-hero-img"
              fluid
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className="bb-hero-text text-start">
            <h2 className="h4">Plan your next summit</h2>
            <p>
              I am building a trip explorer so you can filter by continent, difficulty, and trail
              type, then dig into trip reports for places like Kilimanjaro, Poon Hill, and
              Acatenango.
            </p>
            <Button as={Link} to="/trips" variant="primary" size="lg" className="mb-3">
              Browse trips
            </Button>
            <p className="small mb-0">
              Each destination page will include elevation gain, best season, and gear notes—not
              just pretty pictures.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={7}>
          <section className="bb-hero-panel text-start h-100">
            <p className="bb-hero-label">Planned features</p>
            <ul className="mb-0">
              <li>Filterable trip explorer (continent, difficulty, trip type)</li>
              <li>Wishlist of treks I still want to finish</li>
              <li>Short trail notes and reviews per destination</li>
            </ul>
          </section>
        </Col>
        <Col lg={5}>
          <section className="text-start h-100">
            <h3 className="h5">On the roadmap</h3>
            <p className="text-muted mb-0">
              Next I will wire up real destination data from my proposal, then add the wishlist and
              comment form so the site doubles as a planning tool for other hikers.
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
