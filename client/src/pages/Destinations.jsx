import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

const CATEGORIES = ['all', 'beach', 'mountain', 'city', 'forest', 'desert', 'historical']

function Destinations() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const fetchDestinations = async () => {
    setLoading(true)
    try {
      const params = {}
      if (search) params.search = search
      if (category !== 'all') params.category = category
      const { data } = await axios.get('/destinations', { params })
      setDestinations(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDestinations() }, [category])

  return (
    <div style={{ background: 'var(--obsidian)', minHeight: '100vh' }}>

      {/* Page Hero */}
      <section style={{ position: 'relative', height: '340px' }}>
        <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1600&q=80" alt="destinations"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(13,13,13,1))' }} />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="section-badge">Explore the World</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--cream)', margin: 0 }}>Our Destinations</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && fetchDestinations()}
            placeholder="Search destinations..."
            style={{ flex: 1, minWidth: '200px', background: 'var(--charcoal)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '999px', padding: '12px 20px', color: 'var(--cream)', fontSize: '14px', outline: 'none' }}
          />
          <button onClick={fetchDestinations} className="gold-btn px-6 py-3 rounded-full">Search</button>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{
                padding: '8px 20px', borderRadius: '999px', fontSize: '12px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'capitalize', cursor: 'pointer', transition: 'all 0.2s',
                background: category === cat ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'transparent',
                color: category === cat ? '#0D0D0D' : 'var(--warm-gray)',
                border: category === cat ? 'none' : '1px solid rgba(201,168,76,0.25)',
              }}>
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--warm-gray)' }}>Loading...</div>
        ) : destinations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--warm-gray)' }}>No destinations found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map(d => (
              <Link key={d._id} to={`/destinations/${d._id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'var(--card-bg)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.1)', transition: 'all 0.3s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ position: 'relative', height: '220px' }}>
                    <img src={d.image || `https://source.unsplash.com/600x400/?${d.category},travel`} alt={d.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
                    <div style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(13,13,13,0.7)', border: '1px solid rgba(201,168,76,0.5)', borderRadius: '999px', padding: '4px 12px', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {d.category}
                    </div>
                    <div style={{ position: 'absolute', bottom: '14px', left: '16px', right: '16px' }}>
                      <h3 style={{ color: 'var(--cream)', fontSize: '20px', margin: '0 0 4px' }}>{d.name}</h3>
                      <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '13px', margin: 0 }}>📍 {d.location}, {d.country}</p>
                    </div>
                  </div>
                  <div style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ color: 'var(--gold)', fontSize: '22px', fontWeight: 700, fontFamily: 'Playfair Display, serif' }}>${d.price}</span>
                      <span style={{ color: 'var(--warm-gray)', fontSize: '12px' }}> / night</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: 'var(--gold)' }}>★</span>
                      <span style={{ color: 'var(--cream)', fontSize: '13px' }}>{d.rating || 'New'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Destinations;