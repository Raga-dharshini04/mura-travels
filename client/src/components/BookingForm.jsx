import { useState } from 'react'
import axios from '../api/axios'

function BookingForm({ destination, onSuccess }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    checkIn: '', checkOut: '', guests: 1,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await axios.post('/bookings', { ...form, destination: destination._id })
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input className={inputClass} name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
      <input className={inputClass} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input className={inputClass} name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Check-in</label>
          <input className={inputClass} name="checkIn" type="date" value={form.checkIn} onChange={handleChange} required />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Check-out</label>
          <input className={inputClass} name="checkOut" type="date" value={form.checkOut} onChange={handleChange} required />
        </div>
      </div>
      <input className={inputClass} name="guests" type="number" min="1" placeholder="Number of guests" value={form.guests} onChange={handleChange} required />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl transition-colors"
      >
        {loading ? 'Booking...' : 'Confirm Booking'}
      </button>
    </form>
  )
}

export default BookingForm;