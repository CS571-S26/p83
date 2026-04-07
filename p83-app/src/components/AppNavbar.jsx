import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function AppNavbar() {
  return (
    <Navbar expand="md" sticky="top" className="bb-navbar py-2">
      <Container>
        <Navbar.Brand as={NavLink} to="/" end>
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
