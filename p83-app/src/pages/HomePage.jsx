import { Link } from 'react-router-dom'
import { FEATURED_SLUGS, HOME_CONTINENT_CARDS, TRIPS } from '../data/trips'
import DestinationCard from '../components/DestinationCard'
import HeroSlideshow from '../components/HeroSlideshow'
import SectionReveal from '../components/SectionReveal'

const featuredTrips = FEATURED_SLUGS.map((slug) => TRIPS.find((t) => t.slug === slug)).filter(Boolean)

export default function HomePage() {
  return (
    <>
      <HeroSlideshow />

      <section className="bb-continent-explore" aria-labelledby="home-regions-heading">
        <div className="bb-shell">
          <SectionReveal>
            <header className="bb-home-intro">
              <p className="bb-home-intro__eyebrow">Explore by region</p>
              <span className="bb-home-intro__rule" aria-hidden="true" />
              <h2 id="home-regions-heading" className="bb-home-intro__title">
                Continents and corridors
              </h2>
              <p className="bb-home-intro__lead">
                Jump to the trip grid with a region pre-selected. You can still refine difficulty and
                route type on the next screen.
              </p>
            </header>
          </SectionReveal>
          <div className="bb-continent-grid">
            {HOME_CONTINENT_CARDS.map((c) => (
              <Link
                key={c.pillRegion}
                to={`/trips?pill=${encodeURIComponent(c.pillRegion)}`}
                className="bb-continent-card"
              >
                <div
                  className="bb-continent-card__bg"
                  style={{ backgroundImage: `url("${c.imageUrl}")` }}
                />
                <div className="bb-continent-card__shade" aria-hidden="true" />
                <div className="bb-continent-card__content">
                  <span className="bb-continent-card__title">{c.title}</span>
                  <span className="bb-continent-card__count">
                    {c.count} destination{c.count === 1 ? '' : 's'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="bb-rule bb-rule--inset" />

      <section className="bb-section bb-shell" aria-labelledby="home-featured-heading">
        <SectionReveal>
          <header className="bb-home-intro">
            <p className="bb-home-intro__eyebrow">Featured</p>
            <span className="bb-home-intro__rule" aria-hidden="true" />
            <h2 id="home-featured-heading" className="bb-home-intro__title">
              Three dispatches
            </h2>
            <p className="bb-home-intro__lead">
              Kilimanjaro by the Lemosho line, Acatenango above the ash line, and Ala Kul in the Kyrgyz
              high country.
            </p>
          </header>
        </SectionReveal>
        <div className="bb-dest-grid bb-dest-grid--featured">
          {featuredTrips.map((trip, index) => (
            <DestinationCard key={trip.slug} trip={trip} index={index} />
          ))}
        </div>
      </section>
    </>
  )
}
