import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from '../../api/axios'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post('/auth/login', form)
      login(data.token)
      toast.success('Welcome back!')
      navigate('/admin')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  const inp = { width: '100%', background: 'var(--moss-2)', border: '1px solid var(--border-gold)', borderRadius: 10, padding: '12px 16px', color: 'var(--cream)', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <img src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=1600&q=80" alt="bg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%)' }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 420, padding: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>🪷</div>
          <div style={{ fontSize: 24, fontFamily: 'Libre Baskerville, serif', color: 'var(--gold)', letterSpacing: '0.08em', marginBottom: 4 }}>MURA Travels</div>
          <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--warm-gray)' }}>Admin Portal</p>
        </div>

        <div style={{ background: 'var(--moss)', border: '1px solid var(--border-gold)', borderRadius: 20, padding: 40 }}>
          <h2 style={{ fontSize: 22, fontFamily: 'Libre Baskerville, serif', color: 'var(--cream)', marginBottom: 6 }}>Welcome Back</h2>
          <p style={{ fontSize: 13, color: 'var(--warm-gray)', marginBottom: 28 }}>Sign in to manage MURA Travels</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', display: 'block', marginBottom: 8 }}>Email</label>
              <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="admin@muratravels.com" required style={inp} />
            </div>
            <div>
              <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--warm-gray)', display: 'block', marginBottom: 8 }}>Password</label>
              <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required style={inp} />
            </div>
            <button type="submit" disabled={loading} style={{ marginTop: 8, background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', color: 'var(--forest)', border: 'none', borderRadius: 10, padding: 14, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'DM Sans, sans-serif' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}