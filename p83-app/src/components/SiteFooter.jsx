import { Link } from 'react-router-dom'

function SiteFooter() {
  return (
    <footer className="bb-site-footer">
      <div className="bb-shell bb-site-footer-inner">
        <div className="bb-site-footer__col">
          <p className="bb-site-footer__brand">▲ Backpacking Basecamp</p>
          <p className="bb-site-footer__tagline">Field notes from six continents.</p>
        </div>
        <div className="bb-site-footer__col bb-site-footer__col--right">
          <nav className="bb-site-footer__nav" aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/trips">Trips</Link>
          </nav>
          <p className="bb-site-footer__credit">Built for CS571 · UW–Madison</p>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
