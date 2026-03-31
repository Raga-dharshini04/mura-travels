import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import toast from 'react-hot-toast'

const CATEGORIES = ['beach', 'mountain', 'city', 'forest', 'desert', 'historical']
const empty = { name: '', description: '', location: '', country: '', price: '', image: '', category: 'city' }

const inp = { width: '100%', background: 'var(--moss-2)', border: '1px solid var(--border-gold)', borderRadius: 10, padding: '10px 14px', color: 'var(--cream)', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif' }

export default function AdminDestinations() {
  const [destinations, setDestinations] = useState([])
  const [form, setForm] = useState(empty)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchDestinations = async () => {
    const { data } = await axios.get('/destinations')
    setDestinations(data)
  }

  useEffect(() => { fetchDestinations() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await axios.put(`/destinations/${editId}`, form)
        toast.success('Destination updated!')
      } else {
        await axios.post('/destinations', form)
        toast.success('Destination added!')
      }
      setForm(empty); setEditId(null); setShowForm(false)
      fetchDestinations()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    }
  }

  const handleEdit = (dest) => { setForm(dest); setEditId(dest._id); setShowForm(true) }

  const handleDelete = async (id) => {
    if (!confirm('Delete this destination?')) return
    try {
      await axios.delete(`/destinations/${id}`)
      toast.success('Deleted!')
      fetchDestinations()
    } catch { toast.error('Delete failed') }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ height: 1, width: 20, background: 'var(--gold)' }} />
            <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Manage</span>
          </div>
          <h1 style={{ fontSize: 32, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)' }}>Destinations</h1>
        </div>
        <button onClick={() => { setShowForm(!showForm); setForm(empty); setEditId(null) }}
          style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--forest)', border: 'none', borderRadius: 10, padding: '10px 22px', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
          {showForm ? 'Cancel' : '+ Add Destination'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h3 style={{ fontSize: 18, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 20 }}>{editId ? 'Edit Destination' : 'New Destination'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input style={inp} placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input style={inp} placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} required />
            <input style={inp} placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} required />
            <input style={inp} type="number" placeholder="Price per night (₹)" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
            <input style={inp} placeholder="Image URL (optional)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            <select style={inp} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {CATEGORIES.map(c => <option key={c} value={c} style={{ background: 'var(--moss)' }}>{c}</option>)}
            </select>
            <textarea style={{ ...inp, gridColumn: '1 / -1', resize: 'vertical' }} placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} required />
            <button type="submit" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--forest)', border: 'none', borderRadius: 10, padding: 12, fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              {editId ? 'Update Destination' : 'Add Destination'}
            </button>
          </form>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {destinations.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--warm-gray)', fontSize: 14 }}>No destinations yet. Add your first one!</div>
        )}
        {destinations.map(d => (
          <div key={d._id} style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 14, padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <img src={d.image || `https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=120&q=70`} alt={d.name}
                style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', border: '1px solid var(--border-gold)' }} />
              <div>
                <p style={{ fontWeight: 600, color: 'var(--cream)', fontSize: 15, marginBottom: 3, fontFamily: 'Libre Baskerville, serif' }}>{d.name}</p>
                <p style={{ fontSize: 12, color: 'var(--warm-gray)' }}>📍 {d.location}, {d.country}</p>
                <p style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, marginTop: 2 }}>₹{d.price}/night</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => handleEdit(d)} style={{ padding: '7px 18px', fontSize: 12, borderRadius: 8, background: 'transparent', border: '1px solid var(--border-gold)', color: 'var(--cream)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Edit</button>
              <button onClick={() => handleDelete(d._id)} style={{ padding: '7px 18px', fontSize: 12, borderRadius: 8, background: 'transparent', border: '1px solid rgba(139,37,0,0.4)', color: 'var(--terra)', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}