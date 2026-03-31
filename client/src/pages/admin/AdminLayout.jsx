import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const links = [
  { to: '/admin', label: 'Dashboard', icon: '◈', end: true },
  { to: '/admin/destinations', label: 'Destinations', icon: '🛕' },
  { to: '/admin/trips', label: 'Trip Plans', icon: '🌿' },
  { to: '/admin/bookings', label: 'Bookings', icon: '📋' },
]

export default function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--forest)' }}>
      <aside style={{ width: 240, background: 'var(--moss)', borderRight: '1px solid var(--border-gold)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh' }}>
        <div style={{ padding: '28px 24px', borderBottom: '1px solid var(--border-gold)' }}>
          <div style={{ fontSize: 18, fontFamily: 'Libre Baskerville, serif', color: 'var(--gold)', letterSpacing: '0.06em' }}>🪷 MURA Travels</div>
          <div style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-gray)', marginTop: 4 }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '20px 12px' }}>
          {links.map(link => (
            <NavLink key={link.to} to={link.to} end={link.end}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 16px', borderRadius: 10, marginBottom: 4,
                textDecoration: 'none', fontSize: 13, fontWeight: 500,
                letterSpacing: '0.03em', transition: 'all 0.2s',
                background: isActive ? 'var(--gold-dim)' : 'transparent',
                color: isActive ? 'var(--gold)' : 'var(--warm-gray)',
                borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
              })}>
              <span>{link.icon}</span>{link.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border-gold)' }}>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderRadius: 10, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--terra)', fontSize: 13, fontWeight: 500 }}>
            ⊗ Logout
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, marginLeft: 240, padding: '40px', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}