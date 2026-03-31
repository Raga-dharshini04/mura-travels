import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import toast from 'react-hot-toast'

function TripDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', numberOfPeople: 1, message: '' })

  useEffect(() => {
    axios.get(`/trips/${id}`).then(r => setTrip(r.data)).catch(console.error).finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post('/bookings', { ...form, tripPlan: id })
      setSubmitted(true)
      toast.success('Booking submitted! Check your email.')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)',
    borderRadius: '10px', padding: '12px 16px', color: 'var(--cream)', fontSize: '14px', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', boxSizing: 'border-box',
  }

  const totalPrice = trip ? trip.price * form.numberOfPeople : 0
  const nights = trip ? Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) : 0

  if (loading) return <div style={{ textAlign: 'center', padding: '120px', color: 'var(--warm-gray)', background: 'var(--obsidian)', minHeight: '100vh' }}>Loading...</div>
  if (!trip) return <div style={{ textAlign: 'center', padding: '120px', color: 'var(--warm-gray)', background: 'var(--obsidian)', minHeight: '100vh' }}>Trip not found.</div>

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ position: 'relative', height: '420px' }}>
        <img src={trip.image || `https://source.unsplash.com/1200x600/?${trip.destination?.name || 'travel'}`} alt={trip.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(13,13,13,1))' }} />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}>
          <div className="section-badge">{trip.destination?.name}</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', color: 'var(--cream)', margin: '0 0 12px' }}>{trip.title}</h1>
          <p style={{ color: 'var(--warm-gray)', fontSize: '14px' }}>
            🗓 {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} → {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Trip info */}
        <div>
          <h2 style={{ color: 'var(--cream)', fontSize: '28px', marginBottom: '16px' }}>About This Trip</h2>
          <p style={{ color: 'var(--warm-gray)', lineHeight: 1.9, fontSize: '15px', marginBottom: '28px' }}>{trip.description}</p>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.15)', borderRadius: '14px', overflow: 'hidden', marginBottom: '28px' }}>
            {[
              { label: 'Duration', value: `${nights} nights` },
              { label: 'Seats Left', value: trip.seatsAvailable },
              { label: 'Per Person', value: `$${trip.price}` },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--card-bg)', padding: '20px', textAlign: 'center' }}>
                <div style={{ color: 'var(--warm-gray)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>{s.label}</div>
                <div style={{ color: s.label === 'Per Person' ? 'var(--gold)' : 'var(--cream)', fontSize: '20px', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Included */}
          {trip.included?.length > 0 && (
            <>
              <h3 style={{ color: 'var(--cream)', fontSize: '18px', marginBottom: '14px' }}>What's Included</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {trip.included.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--warm-gray)', fontSize: '14px' }}>
                    <span style={{ color: 'var(--gold)' }}>✦</span> {item}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Booking form */}
        <div>
          <div style={{ background: 'var(--card-bg)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '20px', padding: '32px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✦</div>
                <h3 style={{ color: 'var(--gold)', fontSize: '24px', marginBottom: '12px' }}>Booking Received!</h3>
                <p style={{ color: 'var(--warm-gray)', lineHeight: 1.8, marginBottom: '24px' }}>
                  Thank you! We've sent a confirmation to <strong style={{ color: 'var(--cream)' }}>{form.email}</strong>.<br />
                  Our team will contact you shortly.
                </p>
                <button onClick={() => navigate('/trips')} className="gold-btn px-8 py-3 rounded-full">
                  Browse More Trips
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ color: 'var(--cream)', fontSize: '24px', marginBottom: '6px' }}>Reserve Your Spot</h2>
                <p style={{ color: 'var(--warm-gray)', fontSize: '13px', marginBottom: '24px' }}>Fill in your details and we'll confirm your booking via email.</p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <input style={inputStyle} placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  <input style={inputStyle} type="email" placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  <input style={inputStyle} placeholder="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />

                  <div>
                    <label style={{ color: 'var(--warm-gray)', fontSize: '12px', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>NUMBER OF PEOPLE</label>
                    <input style={inputStyle} type="number" min="1" max={trip.seatsAvailable} value={form.numberOfPeople}
                      onChange={e => setForm({ ...form, numberOfPeople: Number(e.target.value) })} required />
                  </div>

                  <textarea style={{ ...inputStyle, resize: 'none' }} placeholder="Any special requests or questions? (optional)" rows={3}
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />

                  {/* Price summary */}
                  <div style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--warm-gray)', fontSize: '13px' }}>${trip.price} × {form.numberOfPeople} {form.numberOfPeople > 1 ? 'people' : 'person'}</span>
                    <span style={{ color: 'var(--gold)', fontSize: '20px', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>${totalPrice}</span>
                  </div>

                  <button type="submit" disabled={submitting} className="gold-btn w-full py-3.5 rounded-full"
                    style={{ fontSize: '13px', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Submitting...' : 'Confirm Booking'}
                  </button>

                  <p style={{ color: 'var(--warm-gray)', fontSize: '12px', textAlign: 'center', lineHeight: 1.6 }}>
                    A confirmation copy will be sent to your email. Our team will contact you within 24 hours.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripDetail;