import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import DestinationDetail from './pages/DestinationDetail'
import Trips from './pages/Trips'
import TripDetail from './pages/TripDetail'
import Bookings from './pages/Bookings'
import NotFound from './pages/NotFound'

import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDestinations from './pages/admin/AdminDestinations'
import AdminTrips from './pages/admin/AdminTrips'
import AdminBookings from './pages/admin/AdminBookings'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" toastOptions={{
          style: { background: '#1A1A1A', color: '#F5F0E8', border: '1px solid rgba(201,168,76,0.3)' }
        }} />
        <Routes>
          {/* Public */}
          <Route path="/" element={<><Navbar /><Home /></>} />
          <Route path="/destinations" element={<><Navbar /><Destinations /></>} />
          <Route path="/destinations/:id" element={<><Navbar /><DestinationDetail /></>} />
          <Route path="/trips" element={<><Navbar /><Trips /></>} />
          <Route path="/trips/:id" element={<><Navbar /><TripDetail /></>} />
          <Route path="/bookings" element={<><Navbar /><Bookings /></>} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="trips" element={<AdminTrips />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App