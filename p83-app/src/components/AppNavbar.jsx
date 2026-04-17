import { useEffect, useState } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'

function NavbarInner({ heroNav }) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (expanded) document.body.classList.add('bb-nav-menu-open')
    else document.body.classList.remove('bb-nav-menu-open')
    return () => document.body.classList.remove('bb-nav-menu-open')
  }, [expanded])

  return (
    <Navbar
      expand="md"
      fixed="top"
      expanded={expanded}
      onToggle={setExpanded}
      className={`bb-navbar ${heroNav ? 'bb-navbar--hero' : 'bb-navbar--solid'}`}
    >
      <Container className="bb-shell bb-navbar-inner">
        <Navbar.Brand as={NavLink} to="/" end className="bb-navbar-brand">
          <span className="bb-navbar-logo" aria-hidden="true">
            ▲
          </span>
          <span>Backpacking Basecamp</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="bb-main-nav" className="bb-navbar-toggler" />
        <Navbar.Collapse id="bb-main-nav" className="bb-navbar-collapse">
          <Nav className="ms-auto bb-nav-links">
            <Nav.Link as={NavLink} to="/" end className="bb-nav-link nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/trips" className="bb-nav-link nav-link">
              Trips
            </Nav.Link>
            <Nav.Link as={NavLink} to="/forums" className="bb-nav-link nav-link">
              Forums
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function AppNavbar() {
  const { pathname } = useLocation()
  const [scrollY, setScrollY] = useState(0)

  const onHome = pathname === '/'
  const heroNav = onHome && scrollY <= 80

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <NavbarInner key={pathname} heroNav={heroNav} />
}

export default AppNavbar
