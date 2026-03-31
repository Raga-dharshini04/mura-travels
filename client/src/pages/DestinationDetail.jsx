import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../api/axios'
import toast from 'react-hot-toast'

const inp = { width: '100%', background: 'var(--moss-2)', border: '1px solid var(--border-gold)', borderRadius: 10, padding: '12px 16px', color: 'var(--cream)', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif' }
const label = { fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', display: 'block', marginBottom: 8 }

export default function DestinationDetail() {
  const { id } = useParams()
  const [destination, setDestination] = useState(null)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' })
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: 1 })

  const fetchData = async () => {
    try {
      const [destRes, revRes] = await Promise.all([
        axios.get(`/destinations/${id}`),
        axios.get(`/reviews/${id}`)
      ])
      setDestination(destRes.data)
      setReviews(revRes.data)
    } catch (err) {
      console.error(err)
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [id])

  const handleBooking = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/bookings', { ...form, destination: id })
      setBookingSuccess(true)
      toast.success('Booking confirmed!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    }
  }

  const handleReview = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/reviews', { ...newReview, destination: id })
      setNewReview({ name: '', rating: 5, comment: '' })
      toast.success('Review submitted!')
      fetchData()
    } catch (err) {
      toast.error('Failed to submit review')
    }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warm-gray)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🪷</div>
        <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading...</p>
      </div>
    </div>
  )

  if (!destination) return (
    <div style={{ minHeight: '100vh', background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warm-gray)' }}>
      <p>Destination not found.</p>
    </div>
  )

  const { name, description, location, country, price, image, category, rating } = destination
  const fallback = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&q=80'

  return (
    <div style={{ background: 'var(--forest)', minHeight: '100vh', paddingTop: 72 }}>

      {/* Hero image */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
        <img
          src={image && image.trim() !== '' ? image : fallback}
          alt={name}
          onError={e => { e.target.onerror = null; e.target.src = fallback }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,43,26,0.2) 0%, rgba(26,43,26,0.98) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 32px 32px', maxWidth: 1200, margin: '0 auto' }}>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--forest)', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', padding: '4px 14px', borderRadius: 999, fontWeight: 700, display: 'inline-block', marginBottom: 12 }}>{category}</span>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 8 }}>{name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 14, color: 'var(--cream-dim)' }}>📍 {location}, {country}</span>
            <span style={{ fontSize: 14, color: 'var(--gold)' }}>⭐ {rating || 'No rating yet'}</span>
            <span style={{ fontSize: 20, fontFamily: 'Libre Baskerville, serif', color: 'var(--gold)', fontWeight: 700 }}>₹{price}<span style={{ fontSize: 13, color: 'var(--warm-gray)', fontFamily: 'DM Sans', fontWeight: 400 }}>/night</span></span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 80px' }}>

        {/* Description */}
        <div style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, padding: '28px 32px', marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ height: 1, width: 24, background: 'var(--gold)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>About</span>
          </div>
          <p style={{ fontSize: 15, color: 'var(--cream-dim)', lineHeight: 1.9 }}>{description}</p>
        </div>

        {/* Two column — Booking + Reviews */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>

          {/* ── BOOKING FORM ── */}
          <div style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, padding: '28px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ height: 1, width: 24, background: 'var(--gold)' }} />
              <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Reserve</span>
            </div>
            <h2 style={{ fontSize: 22, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 24 }}>Book this Destination</h2>

            {bookingSuccess ? (
              <div style={{ background: 'rgba(106,180,106,0.1)', border: '1px solid rgba(106,180,106,0.3)', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>✅</div>
                <p style={{ color: '#6AB46A', fontWeight: 600, marginBottom: 6 }}>Booking Confirmed!</p>
                <p style={{ fontSize: 13, color: 'var(--warm-gray)' }}>We'll contact you shortly to confirm your stay.</p>
              </div>
            ) : (
              <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={label}>Full Name</label>
                  <input style={inp} placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label style={label}>Email</label>
                  <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label style={label}>Phone Number</label>
                  <input style={inp} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={label}>Check-in</label>
                    <input style={inp} type="date" value={form.checkIn} onChange={e => setForm({ ...form, checkIn: e.target.value })} required />
                  </div>
                  <div>
                    <label style={label}>Check-out</label>
                    <input style={inp} type="date" value={form.checkOut} onChange={e => setForm({ ...form, checkOut: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label style={label}>Number of Guests</label>
                  <input style={inp} type="number" min="1" placeholder="1" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} required />
                </div>
                <button type="submit" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--forest)', border: 'none', borderRadius: 10, padding: '14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', marginTop: 4 }}>
                  Confirm Booking
                </button>
              </form>
            )}
          </div>

          {/* ── REVIEWS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Reviews list */}
            <div style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ height: 1, width: 24, background: 'var(--gold)' }} />
                <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Reviews</span>
              </div>
              <h2 style={{ fontSize: 20, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 20 }}>
                Traveller Reviews <span style={{ fontSize: 14, color: 'var(--warm-gray)', fontFamily: 'DM Sans', fontWeight: 400 }}>({reviews.length})</span>
              </h2>
              {reviews.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--warm-gray)', fontStyle: 'italic' }}>No reviews yet. Be the first to share your experience!</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 280, overflowY: 'auto' }}>
                  {reviews.map(r => (
                    <div key={r._id} style={{ background: 'var(--moss-2)', border: '1px solid var(--border-cream)', borderRadius: 12, padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, color: 'var(--cream)', fontSize: 14 }}>{r.name}</span>
                        <span style={{ fontSize: 11, color: 'var(--warm-gray)' }}>{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i} style={{ color: i < r.rating ? 'var(--gold)' : 'var(--moss-3)', fontSize: 14 }}>★</span>
                        ))}
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--cream-dim)', lineHeight: 1.6 }}>{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add review */}
            <div style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, padding: '28px 32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ height: 1, width: 24, background: 'var(--gold)' }} />
                <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Share</span>
              </div>
              <h3 style={{ fontSize: 18, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 20 }}>Leave a Review</h3>
              <form onSubmit={handleReview} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={label}>Your Name</label>
                  <input style={inp} placeholder="Your name" value={newReview.name} onChange={e => setNewReview({ ...newReview, name: e.target.value })} required />
                </div>
                <div>
                  <label style={label}>Rating</label>
                  <select style={inp} value={newReview.rating} onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}>
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n} style={{ background: 'var(--moss)' }}>{n} stars {'★'.repeat(n)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={label}>Your Review</label>
                  <textarea style={{ ...inp, resize: 'vertical' }} placeholder="Share your experience..." rows={3} value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} required />
                </div>
                <button type="submit" style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--forest)', border: 'none', borderRadius: 10, padding: '12px', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}