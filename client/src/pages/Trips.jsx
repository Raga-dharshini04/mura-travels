import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'

export default function Trips() {
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('/trips').then(r => setTrips(r.data)).finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? trips : trips.filter(t => t.status === filter)

  return (
    <div style={{ background: 'var(--forest)', minHeight: '100vh', paddingTop: 72 }}>

      {/* Header */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&q=80" alt="trips"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,43,26,0.7) 0%, rgba(26,43,26,0.95) 100%)' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ height: 1, width: 32, background: 'var(--gold)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Upcoming Adventures</span>
            <div style={{ height: 1, width: 32, background: 'var(--gold)' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)' }}>Trip Plans</h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 80px' }}>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 48, justifyContent: 'center' }}>
          {['all', 'upcoming', 'ongoing', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '9px 22px', borderRadius: 999, fontSize: 12, fontWeight: 500,
              letterSpacing: '0.08em', textTransform: 'capitalize', cursor: 'pointer',
              background: filter === f ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'transparent',
              color: filter === f ? 'var(--forest)' : 'var(--warm-gray)',
              border: filter === f ? 'none' : '1px solid var(--border-gold)',
              transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
            }}>{f}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--warm-gray)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🪷</div>
            <p style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading trips...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--warm-gray)' }}>
            <p>No trips found.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 28 }}>
            {filtered.map(t => <TripCard key={t._id} t={t} onBook={() => navigate(`/trips/${t._id}`)} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function TripCard({ t, onBook }) {
  const [hover, setHover] = useState(false)
  const nights = Math.ceil((new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24))
  const statusColor = { upcoming: 'var(--gold)', ongoing: '#6AB46A', completed: 'var(--warm-gray)', cancelled: 'var(--terra)' }
  const fallback = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80'

  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ borderRadius: 20, overflow: 'hidden', background: 'var(--moss)', border: `1px solid ${hover ? 'rgba(212,175,55,0.5)' : 'var(--border-gold)'}`, transition: 'all 0.3s', transform: hover ? 'translateY(-6px)' : 'none', boxShadow: hover ? '0 24px 60px rgba(0,0,0,0.4)' : 'none' }}>

      {/* Image */}
      <div style={{ position: 'relative', height: 230, overflow: 'hidden' }}>
        <img
          src={t.image && t.image.trim() !== '' ? t.image : fallback}
          alt={t.title}
          onError={e => { e.target.onerror = null; e.target.src = fallback }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hover ? 'scale(1.06)' : 'scale(1)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,43,26,0.9) 0%, transparent 60%)' }} />
        <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 999, fontWeight: 700, color: statusColor[t.status], background: 'rgba(26,43,26,0.7)', border: `1px solid ${statusColor[t.status]}`, backdropFilter: 'blur(8px)' }}>{t.status}</span>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px' }}>
          <h3 style={{ fontSize: 22, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 4 }}>{t.title}</h3>
          <p style={{ fontSize: 12, color: 'rgba(255,245,230,0.65)' }}>📍 {t.destination?.name}, {t.destination?.country}</p>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px 22px' }}>

        {/* Info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginBottom: 18, border: '1px solid var(--border-gold)', borderRadius: 12, overflow: 'hidden' }}>
          {[
            { label: 'Duration', value: `${nights} nights` },
            { label: 'Seats', value: `${t.seatsAvailable} left` },
            { label: 'Per Person', value: `₹${t.price}` },
          ].map((info, i) => (
            <div key={info.label} style={{ padding: '12px 14px', textAlign: 'center', borderRight: i < 2 ? '1px solid var(--border-gold)' : 'none', background: 'var(--moss-2)' }}>
              <p style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 5 }}>{info.label}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: i === 2 ? 'var(--gold)' : 'var(--cream)', fontFamily: i === 2 ? 'Libre Baskerville, serif' : 'DM Sans, sans-serif' }}>{info.value}</p>
            </div>
          ))}
        </div>

        {/* Date */}
        <p style={{ fontSize: 12, color: 'var(--warm-gray)', marginBottom: 14 }}>
          🗓 {new Date(t.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} → {new Date(t.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>

        {/* Included tags */}
        {t.included?.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
            {t.included.map(item => (
              <span key={item} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: 'var(--gold-dim)', color: 'var(--gold)', border: '1px solid var(--border-gold)' }}>✓ {item}</span>
            ))}
          </div>
        )}

        {/* Book button */}
        <button onClick={onBook}
          style={{ width: '100%', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--forest)', border: 'none', borderRadius: 10, padding: '13px', fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', transition: 'opacity 0.2s', opacity: hover ? 0.9 : 1 }}>
          Book This Trip
        </button>
      </div>
    </div>
  )
}