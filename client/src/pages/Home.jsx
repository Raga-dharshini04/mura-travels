import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'

const HERO = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1800&q=90'
const CTA_BG = 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=1600&q=80'

const FEATURES = [
  { icon: '🛕', title: 'Temple Heritage', desc: 'Explore ancient Dravidian temples, sacred rituals and timeless architecture.' },
  { icon: '🌿', title: 'Hill Escapes', desc: 'Misty tea gardens of Munnar, Ooty and Coorg — nature at its finest.' },
  { icon: '🚣', title: 'Kerala Backwaters', desc: 'Drift through tranquil lagoons on a traditional houseboat.' },
  { icon: '🌺', title: 'Curated Trips', desc: 'Expert-planned itineraries crafted for every kind of traveller.' },
]

export default function Home() {
  const [destinations, setDestinations] = useState([])
  const [trips, setTrips] = useState([])

  useEffect(() => {
    axios.get('/destinations').then(r => setDestinations(r.data.slice(0, 3))).catch(() => {})
    axios.get('/trips').then(r => setTrips(r.data.filter(t => t.status === 'upcoming').slice(0, 3))).catch(() => {})
  }, [])

  return (
    <div style={{ background: 'var(--forest)', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={HERO} alt="South India" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,43,26,0.92) 0%, rgba(26,43,26,0.55) 55%, rgba(139,37,0,0.25) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--forest) 100%)' }} />

        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px', maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ height: 1, width: 40, background: 'var(--gold)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500 }}>South India Travels</span>
            <div style={{ height: 1, width: 40, background: 'var(--gold)' }} />
          </div>
          <h1 style={{ fontSize: 'clamp(38px, 7vw, 76px)', fontFamily: 'Libre Baskerville, serif', fontWeight: 700, color: 'var(--cream)', lineHeight: 1.1, marginBottom: 20 }}>
            Discover the<br /><span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Soul of the South</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--cream-dim)', lineHeight: 1.8, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            From misty hill stations to ancient temples, sacred rivers and serene backwaters — experience India's most spiritual land.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/destinations" style={{ textDecoration: 'none', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--forest)', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', padding: '14px 36px', borderRadius: 999, boxShadow: '0 4px 24px rgba(212,175,55,0.35)' }}>Explore Destinations</Link>
            <Link to="/trips" style={{ textDecoration: 'none', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--cream)', background: 'transparent', padding: '14px 36px', borderRadius: 999, border: '1px solid rgba(255,245,230,0.3)' }}>View Trip Plans</Link>
          </div>
        </div>

        {/* Scroll line */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,245,230,0.35)' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)' }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background: 'var(--moss)', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[
            { num: '50+', label: 'Destinations' },
            { num: '5K+', label: 'Happy Travellers' },
            { num: '4', label: 'States Covered' },
            { num: '10+', label: 'Years Experience' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '32px 16px', borderRight: i < 3 ? '1px solid var(--border-gold)' : 'none' }}>
              <div style={{ fontSize: 36, fontFamily: 'Libre Baskerville, serif', color: 'var(--gold)', fontWeight: 700 }}>{s.num}</div>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ height: 1, width: 32, background: 'var(--gold)' }} />
            <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Why MURA Travels</span>
            <div style={{ height: 1, width: 32, background: 'var(--gold)' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)' }}>
            Your Gateway to<br /><span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Incredible South India</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 24 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: 'var(--warm-gray)', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED DESTINATIONS ── */}
      {destinations.length > 0 && (
        <section style={{ background: 'var(--moss)', borderTop: '1px solid var(--border-cream)', borderBottom: '1px solid var(--border-cream)', padding: '100px 32px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ height: 1, width: 32, background: 'var(--gold)' }} />
                  <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Handpicked</span>
                </div>
                <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', lineHeight: 1.15 }}>Featured<br />Destinations</h2>
              </div>
              <Link to="/destinations" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid var(--gold)', paddingBottom: 2 }}>View All →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 24 }}>
              {destinations.map(d => <DestCard key={d._id} d={d} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── UPCOMING TRIPS ── */}
      {trips.length > 0 && (
        <section style={{ maxWidth: 1200, margin: '0 auto', padding: '100px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ height: 1, width: 32, background: 'var(--gold)' }} />
                <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Upcoming</span>
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', lineHeight: 1.15 }}>Curated<br />Trip Plans</h2>
            </div>
            <Link to="/trips" style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', borderBottom: '1px solid var(--gold)', paddingBottom: 2 }}>View All →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 24 }}>
            {trips.map(t => <TripCard key={t._id} t={t} />)}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section style={{ position: 'relative', padding: '120px 32px', overflow: 'hidden', background: 'var(--moss)' }}>
        <img src={CTA_BG} alt="cta" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15 }} />
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🪷</div>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 20 }}>
            Ready for Your<br /><span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>South India Journey?</span>
          </h2>
          <p style={{ color: 'var(--warm-gray)', marginBottom: 36, lineHeight: 1.8, fontSize: 15 }}>Let MURA Travels craft your perfect itinerary across the most spiritual and beautiful landscapes of South India.</p>
          <Link to="/destinations" style={{ textDecoration: 'none', fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, color: 'var(--forest)', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', padding: '16px 48px', borderRadius: 999, boxShadow: '0 4px 32px rgba(212,175,55,0.35)', display: 'inline-block' }}>Start Your Journey</Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--moss)', borderTop: '1px solid var(--border-gold)', padding: '48px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 20, fontFamily: 'Libre Baskerville, serif', color: 'var(--gold)', letterSpacing: '0.08em', marginBottom: 6 }}>🪷 MURA Travels</div>
            <p style={{ fontSize: 12, color: 'var(--warm-gray)' }}>Crafting authentic South India experiences since 2015</p>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Home', 'Destinations', 'Trips', 'Bookings'].map(l => (
              <Link key={l} to={l === 'Home' ? '/' : `/${l.toLowerCase()}`} style={{ fontSize: 12, color: 'var(--warm-gray)', textDecoration: 'none', letterSpacing: '0.08em' }}>{l}</Link>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--warm-gray)' }}>© {new Date().getFullYear()} MURA Travels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function DestCard({ d }) {
  const [hover, setHover] = useState(false)
  return (
    <Link to={`/destinations/${d._id}`} style={{ textDecoration: 'none' }}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--moss-2)', border: `1px solid ${hover ? 'var(--border-gold)' : 'var(--border-cream)'}`, transition: 'all 0.3s', transform: hover ? 'translateY(-6px)' : 'none', boxShadow: hover ? '0 24px 60px rgba(0,0,0,0.4)' : 'none' }}>
        <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
          <img src={d.image || `https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80`} alt={d.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hover ? 'scale(1.07)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,43,26,0.8), transparent)' }} />
          <span style={{ position: 'absolute', top: 16, left: 16, fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--forest)', background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', padding: '4px 12px', borderRadius: 999, fontWeight: 700 }}>{d.category}</span>
          {d.rating > 0 && <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 12, color: 'var(--gold)', background: 'rgba(26,43,26,0.75)', padding: '4px 10px', borderRadius: 999, backdropFilter: 'blur(8px)' }}>⭐ {d.rating}</span>}
        </div>
        <div style={{ padding: '20px 24px 24px' }}>
          <h3 style={{ fontSize: 20, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 6 }}>{d.name}</h3>
          <p style={{ fontSize: 13, color: 'var(--warm-gray)', marginBottom: 16 }}>📍 {d.location}, {d.country}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border-cream)' }}>
            <span style={{ fontSize: 13, color: 'var(--warm-gray)' }}>{d.reviewCount || 0} reviews</span>
            <span style={{ fontSize: 20, fontFamily: 'Libre Baskerville, serif', color: 'var(--gold)', fontWeight: 700 }}>₹{d.price}<span style={{ fontSize: 12, color: 'var(--warm-gray)', fontFamily: 'DM Sans', fontWeight: 400 }}>/night</span></span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function TripCard({ t }) {
  const [hover, setHover] = useState(false)
  const nights = Math.ceil((new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24))
  return (
    <Link to="/trips" style={{ textDecoration: 'none' }}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--moss-2)', border: `1px solid ${hover ? 'var(--border-gold)' : 'var(--border-cream)'}`, transition: 'all 0.3s', transform: hover ? 'translateY(-6px)' : 'none' }}>
        <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
          <img src={t.image || `https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80`} alt={t.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hover ? 'scale(1.07)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,43,26,0.85), transparent)' }} />
          <span style={{ position: 'absolute', bottom: 16, left: 16, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 999, fontWeight: 700, color: 'var(--gold)', background: 'rgba(26,43,26,0.6)', border: '1px solid var(--border-gold)', backdropFilter: 'blur(8px)' }}>{t.status}</span>
        </div>
        <div style={{ padding: '20px 24px 24px' }}>
          <h3 style={{ fontSize: 18, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 6 }}>{t.title}</h3>
          <p style={{ fontSize: 13, color: 'var(--warm-gray)', marginBottom: 4 }}>📍 {t.destination?.name}</p>
          <p style={{ fontSize: 13, color: 'var(--warm-gray)', marginBottom: 16 }}>🗓 {nights} nights · {new Date(t.startDate).toLocaleDateString()}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border-cream)' }}>
            <span style={{ fontSize: 13, color: 'var(--warm-gray)' }}>💺 {t.seatsAvailable} seats</span>
            <span style={{ fontSize: 18, fontFamily: 'Libre Baskerville, serif', color: 'var(--gold)', fontWeight: 700 }}>₹{t.price}<span style={{ fontSize: 12, color: 'var(--warm-gray)', fontFamily: 'DM Sans', fontWeight: 400 }}>/person</span></span>
          </div>
        </div>
      </div>
    </Link>
  )
}