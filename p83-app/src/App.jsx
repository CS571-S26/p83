import './App.css'

function App() {
  return (
    <main className="bb-root">
      <header className="bb-header">
        <h1 className="bb-title">Backpacking Basecamp</h1>
        <p className="bb-subtitle">
          A personal hub for my favorite treks and mountaineering trips around the world.
        </p>
      </header>

      <section className="bb-hero">
        <div className="bb-hero-text">
          <h2>Plan your next summit</h2>
          <p>
            Browse a curated collection of high–altitude summits, crater lakes, volcano climbs,
            and gorge hikes spanning six continents. Each trip comes with difficulty, elevation
            gain, and practical tips.
          </p>
        </div>
        <div className="bb-hero-panel">
          <p className="bb-hero-label">Coming soon</p>
          <ul>
            <li>Filterable trip explorer</li>
            <li>Trip wishlist builder</li>
            <li>Trail notes and reviews</li>
          </ul>
        </div>
      </section>

      <section className="bb-intro">
        <h3>What this site will become</h3>
        <p>
          This is the first published version of Backpacking Basecamp. For now it is a simple
          landing page deployed to GitHub Pages, but it will grow into an interactive trip planner
          with saved wishlists and detailed destination pages.
        </p>
      </section>
    </main>
  )
}

export default App
