'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Zap, Loader, Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Login failed') }
      router.push('/admin')
    } catch (err: any) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background:'linear-gradient(135deg,#b31942 0%,#6d0e28 100%)'}}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{background:'rgba(255,255,255,0.2)'}}>
            <Zap size={32} color="white" fill="white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Supa IT</h1>
          <p className="text-red-200 text-sm mt-1">Admin Panel</p>
        </div>
        <div className="card p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <input className="input" type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="admin@supait.com" required />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input className="input pr-10" type={showPw?'text':'password'} value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} placeholder="••••••••" required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" onClick={()=>setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {error && <div className="p-3 rounded-lg text-sm text-red-700 bg-red-50">{error}</div>}
            <button type="submit" className="btn-primary w-full justify-center py-3" disabled={loading}>
              {loading ? <><Loader size={16} className="animate-spin" />Signing in...</> : 'Sign In'}
            </button>
          </form>
          <div className="mt-6 p-3 rounded-lg bg-gray-50 text-center">
            <p className="text-xs text-gray-500">Default: admin@supait.com / admin123</p>
          </div>
        </div>
        <p className="text-center mt-6 text-red-200 text-sm">
          <a href="/" className="hover:text-white transition-colors">← Back to Website</a>
        </p>
      </div>
    </div>
  )
}
