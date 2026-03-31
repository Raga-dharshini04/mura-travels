import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import toast from 'react-hot-toast'

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get('/bookings')
      setBookings(data)
    } catch { toast.error('Failed to load bookings') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchBookings() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this booking?')) return
    try { await axios.delete(`/bookings/${id}`); toast.success('Deleted!'); fetchBookings() }
    catch { toast.error('Delete failed') }
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--warm-gray)' }}>Loading...</div>

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ height: 1, width: 20, background: 'var(--gold)' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Manage</span>
        </div>
        <h1 style={{ fontSize: 32, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)' }}>All Bookings</h1>
      </div>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--warm-gray)', fontSize: 14 }}>No bookings yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {bookings.map(b => (
            <div key={b._id} style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 14, padding: '20px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px 32px', flex: 1 }}>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Customer</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--cream)', fontFamily: 'Libre Baskerville, serif' }}>{b.name}</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Email</p>
                  <p style={{ fontSize: 13, color: 'var(--cream-dim)' }}>{b.email}</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Phone</p>
                  <p style={{ fontSize: 13, color: 'var(--cream-dim)' }}>{b.phone}</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Destination</p>
                  <p style={{ fontSize: 13, color: 'var(--cream-dim)' }}>{b.destination?.name || '—'}</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>People</p>
                  <p style={{ fontSize: 13, color: 'var(--cream-dim)' }}>{b.numberOfPeople}</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Total</p>
                  <p style={{ fontSize: 16, color: 'var(--gold)', fontWeight: 700, fontFamily: 'Libre Baskerville, serif' }}>₹{b.totalPrice}</p>
                </div>
                {b.message && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginBottom: 4 }}>Message</p>
                    <p style={{ fontSize: 13, color: 'var(--cream-dim)' }}>{b.message}</p>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
                <span style={{ fontSize: 10, padding: '4px 12px', borderRadius: 999, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: b.status === 'confirmed' ? 'rgba(106,180,106,0.12)' : b.status === 'cancelled' ? 'rgba(139,37,0,0.12)' : 'var(--gold-dim)', color: b.status === 'confirmed' ? '#6AB46A' : b.status === 'cancelled' ? 'var(--terra)' : 'var(--gold)', border: `1px solid ${b.status === 'confirmed' ? 'rgba(106,180,106,0.3)' : b.status === 'cancelled' ? 'rgba(139,37,0,0.3)' : 'var(--border-gold)'}` }}>{b.status}</span>
                <p style={{ fontSize: 11, color: 'var(--warm-gray)' }}>{new Date(b.createdAt).toLocaleDateString()}</p>
                <button onClick={() => handleDelete(b._id)} style={{ fontSize: 12, color: 'var(--terra)', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}