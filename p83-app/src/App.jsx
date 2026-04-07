import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import HomePage from './pages/HomePage'
import TripsPage from './pages/TripsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/p83">
      <div className="bb-app d-flex flex-column min-vh-100">
        <AppNavbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/trips" element={<TripsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
