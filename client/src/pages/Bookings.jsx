import { useEffect, useState } from 'react'
import axios from '../api/axios'

function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('/bookings')
      setBookings(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [])

  const handleCancel = async (id) => {
    if (!confirm('Cancel this booking?')) return
    try {
      await axios.delete(`/bookings/${id}`)
      setBookings(bookings.filter(b => b._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <p className="text-center py-20 text-gray-400">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-400 text-center py-20">No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="bg-white rounded-2xl shadow p-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{b.destination?.name}</h3>
                <p className="text-gray-500 text-sm">📍 {b.destination?.location}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">👤 {b.name} &nbsp;·&nbsp; {b.guests} guests</p>
                <p className="text-blue-600 font-semibold mt-1">${b.totalPrice} total</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  b.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                  b.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {b.status}
                </span>
                <button
                  onClick={() => handleCancel(b._id)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookings;