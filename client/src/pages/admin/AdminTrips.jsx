import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import toast from 'react-hot-toast'

const empty = { title: '', description: '', destination: '', startDate: '', endDate: '', price: '', seatsAvailable: '', image: '', included: '', status: 'upcoming' }
const inp = { width: '100%', background: 'var(--moss-2)', border: '1px solid var(--border-gold)', borderRadius: 10, padding: '10px 14px', color: 'var(--cream)', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif' }

export default function AdminTrips() {
  const [trips, setTrips] = useState([])
  const [destinations, setDestinations] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchAll = async () => {
    const [t, d] = await Promise.all([axios.get('/trips'), axios.get('/destinations')])
    setTrips(t.data); setDestinations(d.data)
  }

  useEffect(() => { fetchAll() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...form, included: form.included.split(',').map(s => s.trim()).filter(Boolean) }
      if (editId) {
        await axios.put(`/trips/${editId}`, payload)
        toast.success('Trip updated!')
      } else {
        await axios.post('/trips', payload)
        toast.success('Trip added!')
      }
      setForm(empty); setEditId(null); setShowForm(false)
      fetchAll()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleEdit = (trip) => {
    setForm({ ...trip, destination: trip.destination?._id || trip.destination, startDate: trip.startDate?.slice(0, 10), endDate: trip.endDate?.slice(0, 10), included: trip.included?.join(', ') || '' })
    setEditId(trip._id); setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this trip?')) return
    try { await axios.delete(`/trips/${id}`); toast.success('Deleted!'); fetchAll() }
    catch { toast.error('Delete failed') }
  }

  const statusColor = { upcoming: 'var(--gold)', ongoing: '#6AB46A', completed: 'var(--warm-gray)', cancelled: 'var(--terra)' }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ height: 1, width: 20, background: 'var(--gold)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Manage</span>
          </div>
          <h1 style={{ fontSize: 32, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)' }}>Trip Plans</h1>
        </div>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null) }}
          style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--forest)', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
          {showForm ? 'Cancel' : '+ Add Trip'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h3 style={{ fontSize: 18, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 20 }}>{editId ? 'Edit Trip' : 'New Trip Plan'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input style={inp} placeholder="Trip title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            <select style={inp} value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} required>
              <option value="" style={{ background: 'var(--moss)' }}>Select destination</option>
              {destinations.map(d => <option key={d._id} value={d._id} style={{ background: 'var(--moss)' }}>{d.name}</option>)}
            </select>
            <div>
              <label style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', display: 'block', marginBottom: 6 }}>Start date</label>
              <input style={inp} type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
            </div>
            <div>
              <label style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', display: 'block', marginBottom: 6 }}>End date</label>
              <input style={inp} type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required />
            </div>
            <input style={inp} type="number" placeholder="Price per person (₹)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
            <input style={inp} type="number" placeholder="Seats available" value={form.seatsAvailable} onChange={e => setForm({ ...form, seatsAvailable: e.target.value })} required />
            <input style={inp} placeholder="Image URL (optional)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            <select style={inp} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
              {['upcoming', 'ongoing', 'completed', 'cancelled'].map(s => <option key={s} value={s} style={{ background: 'var(--moss)' }}>{s}</option>)}
            </select>
            <input style={{ ...inp, gridColumn: '1 / -1' }} placeholder="What's included (comma separated): Hotel, Meals, Transport" value={form.included} onChange={e => setForm({ ...form, included: e.target.value })} />
            <textarea style={{ ...inp, gridColumn: '1 / -1', resize: 'vertical' }} placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            <button type="submit" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--forest)', border: 'none', borderRadius: 10, padding: 12, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {editId ? 'Update Trip' : 'Add Trip'}
            </button>
          </form>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {trips.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--warm-gray)', fontSize: 14 }}>No trips yet. Add your first one!</div>
        )}
        {trips.map(t => (
          <div key={t._id} style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 14, padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <p style={{ fontWeight: 600, color: 'var(--cream)', fontSize: 16, fontFamily: 'Libre Baskerville, serif' }}>{t.title}</p>
                <span style={{ fontSize: 10, padding: '3px 10px', borderRadius: 999, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: statusColor[t.status], background: `rgba(212,175,55,0.1)`, border: `1px solid ${statusColor[t.status]}40` }}>{t.status}</span>
              </div>
              <p style={{ fontSize: 12, color: 'var(--warm-gray)', marginBottom: 2 }}>📍 {t.destination?.name} · {t.destination?.location}</p>
              <p style={{ fontSize: 12, color: 'var(--warm-gray)', marginBottom: 6 }}>🗓 {new Date(t.startDate).toLocaleDateString()} → {new Date(t.endDate).toLocaleDateString()}</p>
              <div style={{ display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>₹{t.price}/person</span>
                <span style={{ fontSize: 13, color: 'var(--warm-gray)' }}>💺 {t.seatsAvailable} seats</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
              <button onClick={() => handleEdit(t)} style={{ padding: '7px 18px', fontSize: 12, borderRadius: 8, background: 'transparent', border: '1px solid var(--border-gold)', color: 'var(--cream)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Edit</button>
              <button onClick={() => handleDelete(t._id)} style={{ padding: '7px 18px', fontSize: 12, borderRadius: 8, background: 'transparent', border: '1px solid rgba(139,37,0,0.4)', color: 'var(--terra)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}