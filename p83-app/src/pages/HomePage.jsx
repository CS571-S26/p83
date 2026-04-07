import { Link } from 'react-router-dom'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import heroImg from '../assets/hero.png'

function HomePage() {
  return (
    <Container as="main" className="bb-root py-4">
      <header className="bb-header">
        <p className="bb-eyebrow text-uppercase mb-2">Field notes</p>
        <h1 className="bb-title">Backpacking Basecamp</h1>
        <p className="bb-lead">
          Trip write-ups from six continents—summits, volcanoes, gorges, and high lakes—with
          difficulty, elevation, and gear that actually worked.
        </p>
      </header>

      <div className="bb-hero-section">
        <Row className="align-items-center g-4 g-lg-5">
          <Col lg={6}>
            <div className="bb-hero-img-wrap">
              <Image
                src={heroImg}
                alt="Mountain ridge and clouds at sunrise"
                className="bb-hero-img"
                fluid
              />
            </div>
          </Col>
          <Col lg={6}>
            <div className="bb-hero-text text-start">
              <h2>Plan your next summit</h2>
              <p>
                I am building a trip explorer so you can filter by continent, difficulty, and trail
                type, then open trip reports for places like Kilimanjaro, Poon Hill, and Acatenango.
              </p>
              <Button as={Link} to="/trips" variant="primary" size="lg" className="mb-3">
                Browse trips
              </Button>
              <p className="bb-fine-print mb-0">
                Destination pages will include elevation gain, best season, and gear notes—not just
                photos.
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <Row className="g-4 align-items-stretch">
        <Col lg={7}>
          <section className="bb-hero-panel text-start h-100">
            <p className="bb-hero-label">Planned features</p>
            <ul>
              <li>Filterable trip explorer (continent, difficulty, trip type)</li>
              <li>Wishlist of treks I still want to finish</li>
              <li>Short trail notes and reviews per destination</li>
            </ul>
          </section>
        </Col>
        <Col lg={5}>
          <section className="bb-roadmap text-start h-100 d-flex flex-column justify-content-center">
            <h3>On the roadmap</h3>
            <p className="mb-0">
              Next I will wire up destination data from my proposal, then add the wishlist and
              comment form so the site works as a planning tool for other hikers.
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
