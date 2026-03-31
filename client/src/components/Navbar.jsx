import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/destinations', label: 'Destinations' },
    { to: '/trips', label: 'Trips' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'all 0.4s ease',
      background: scrolled ? 'rgba(26,43,26,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--border-gold)' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.08em', color: 'var(--gold)', marginRight: 2 }}>🪷</span>
          <span style={{ color: 'var(--gold)', fontSize: 20, fontFamily: 'Libre Baskerville, serif', letterSpacing: '0.08em', fontWeight: 700 }}>MURA</span>
          <span style={{ color: 'var(--cream-dim)', fontSize: 13, fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 400 }}>Travels</span>
        </Link>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(link => (
            <Link key={link.to} to={link.to} style={{
              textDecoration: 'none', fontSize: 12,
              letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
              color: pathname === link.to ? 'var(--gold)' : 'var(--cream-dim)',
              transition: 'color 0.2s',
              borderBottom: pathname === link.to ? '1px solid var(--gold)' : '1px solid transparent',
              paddingBottom: 2,
            }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = pathname === link.to ? 'var(--gold)' : 'var(--cream-dim)'}
            >{link.label}</Link>
          ))}
        </div>
      </div>
    </nav>
  )
}