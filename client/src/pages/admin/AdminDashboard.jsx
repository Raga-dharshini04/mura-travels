import { useEffect, useState } from 'react'
import axios from '../../api/axios'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ destinations: 0, trips: 0, bookings: 0 })
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    Promise.all([
      axios.get('/destinations'),
      axios.get('/trips'),
      axios.get('/bookings'),
    ]).then(([d, t, b]) => {
      setStats({ destinations: d.data.length, trips: t.data.length, bookings: b.data.length })
      setBookings(b.data.slice(0, 5))
    })
  }, [])

  const cards = [
    { label: 'Destinations', value: stats.destinations, icon: '🛕', desc: 'Total listed' },
    { label: 'Trip Plans', value: stats.trips, icon: '🌿', desc: 'Active plans' },
    { label: 'Bookings', value: stats.bookings, icon: '📋', desc: 'Total received' },
  ]

  return (
    <div>
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ height: 1, width: 24, background: 'var(--gold)' }} />
          <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Overview</span>
        </div>
        <h1 style={{ fontSize: 36, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)' }}>Dashboard</h1>
        <p style={{ fontSize: 14, color: 'var(--warm-gray)', marginTop: 6 }}>Welcome back to MURA Travels 🪷</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, marginBottom: 40 }}>
        {cards.map(card => (
          <div key={card.label} style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, padding: '28px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 16, right: 20, fontSize: 36, opacity: 0.12 }}>{card.icon}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 12 }}>{card.desc}</div>
            <div style={{ fontSize: 48, fontFamily: 'Libre Baskerville, serif', color: 'var(--gold)', fontWeight: 700, lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: 14, color: 'var(--cream)', marginTop: 8, fontWeight: 500 }}>{card.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-gold)' }}>
          <h2 style={{ fontSize: 20, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)' }}>Recent Bookings</h2>
        </div>
        {bookings.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: 'var(--warm-gray)', fontSize: 14 }}>No bookings yet.</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-cream)' }}>
                {['Customer', 'Email', 'Destination', 'People', 'Total', 'Status'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={b._id} style={{ borderBottom: i < bookings.length - 1 ? '1px solid var(--border-cream)' : 'none' }}>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: 'var(--cream)', fontWeight: 500 }}>{b.name}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--warm-gray)' }}>{b.email}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--warm-gray)' }}>{b.destination?.name || '—'}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--warm-gray)' }}>{b.numberOfPeople}</td>
                  <td style={{ padding: '14px 20px', fontSize: 14, color: 'var(--gold)', fontFamily: 'Libre Baskerville, serif', fontWeight: 700 }}>₹{b.totalPrice}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: 11, padding: '4px 12px', borderRadius: 999, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: b.status === 'confirmed' ? 'rgba(106,180,106,0.12)' : b.status === 'cancelled' ? 'rgba(180,106,106,0.12)' : 'var(--gold-dim)', color: b.status === 'confirmed' ? '#6AB46A' : b.status === 'cancelled' ? '#B46A6A' : 'var(--gold)', border: `1px solid ${b.status === 'confirmed' ? 'rgba(106,180,106,0.3)' : b.status === 'cancelled' ? 'rgba(180,106,106,0.3)' : 'var(--border-gold)'}` }}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}