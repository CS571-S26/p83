import { useEffect } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import AppNavbar from './components/AppNavbar'
import WishlistSidebar from './components/WishlistSidebar'
import SiteFooter from './components/SiteFooter'
import HomePage from './pages/HomePage'
import TripsPage from './pages/TripsPage'
import TripDetailPage from './pages/TripDetailPage'
import ForumsPage from './pages/ForumsPage'
import { applySeedData } from './data/seedData'
import './App.css'

function App() {
  useEffect(() => {
    applySeedData()
  }, [])

  return (
    <HashRouter>
      <WishlistProvider>
        <div className="bb-app">
          <AppNavbar />
          <div className="bb-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/forums" element={<ForumsPage />} />
              <Route path="/trips/:slug" element={<TripDetailPage />} />
            </Routes>
          </div>
          <SiteFooter />
          <WishlistSidebar />
        </div>
      </WishlistProvider>
    </HashRouter>
  )
}

export default App
