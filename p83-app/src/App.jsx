import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { WishlistProvider } from './context/WishlistContext'
import AppNavbar from './components/AppNavbar'
import WishlistSidebar from './components/WishlistSidebar'
import SiteFooter from './components/SiteFooter'
import HomePage from './pages/HomePage'
import TripsPage from './pages/TripsPage'
import TripDetailPage from './pages/TripDetailPage'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/p83">
      <WishlistProvider>
        <div className="bb-app">
          <AppNavbar />
          <div className="bb-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/trips" element={<TripsPage />} />
              <Route path="/trips/:slug" element={<TripDetailPage />} />
            </Routes>
          </div>
          <SiteFooter />
          <WishlistSidebar />
        </div>
      </WishlistProvider>
    </BrowserRouter>
  )
}

export default App
