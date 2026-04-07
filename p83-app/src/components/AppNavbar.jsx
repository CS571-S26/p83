import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function AppNavbar() {
  return (
    <Navbar
      expand="md"
      sticky="top"
      bg="body-tertiary"
      className="border-bottom shadow-sm"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" end className="fw-semibold">
          Backpacking Basecamp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="bb-main-nav" />
        <Navbar.Collapse id="bb-main-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/trips">
              Trips
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppNavbar
