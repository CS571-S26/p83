import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import { CompletionProvider } from './context/CompletionContext'
import AppNavbar from './components/AppNavbar'
import WishlistSidebar from './components/WishlistSidebar'
import SiteFooter from './components/SiteFooter'
import HomePage from './pages/HomePage'
import TripsPage from './pages/TripsPage'
import TripDetailPage from './pages/TripDetailPage'
import ForumsPage from './pages/ForumsPage'
import { applySeedData } from './data/seedData'
import { migrateLocalDataToSupabase } from './lib/migrateToSupabase'
import './App.css'

function App() {
  useEffect(() => {
    applySeedData()
    // Migrate existing localStorage data to Supabase on first load
    migrateLocalDataToSupabase()
  }, [])

  return (
    <HashRouter>
      <CompletionProvider>
        <WishlistProvider>
          <div className="bb-app">
            <a href="#main-content" className="bb-skip-link">
              Skip to main content
            </a>
            <AppNavbar />
            <main id="main-content" className="bb-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trips" element={<TripsPage />} />
                <Route path="/forums" element={<ForumsPage />} />
                <Route path="/trips/:slug" element={<TripDetailPage />} />
              </Routes>
            </main>
            <SiteFooter />
            <WishlistSidebar />
          </div>
        </WishlistProvider>
      </CompletionProvider>
    </HashRouter>
  )
}

export default App
