'use client'
import { useState, useRef } from 'react'
import { Save, Check, Upload, X, Image } from 'lucide-react'

export default function SettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = (key: string, value: string) => setSettings(p => ({ ...p, [key]: value }))

  const save = async () => {
    setSaving(true)
    await fetch('/api/settings', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(settings) })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 500 * 1024) {
      alert('Logo file must be under 500KB')
      return
    }
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = reader.result as string
      set('logo', base64)
    }
    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    set('logo', '')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const Field = ({ label, k, type='text', placeholder='' }: { label:string, k:string, type?:string, placeholder?:string }) => (
    <div>
      <label className="label">{label}</label>
      {type === 'textarea'
        ? <textarea className="input" rows={3} value={settings[k]||''} onChange={e=>set(k,e.target.value)} placeholder={placeholder} />
        : <input className="input" type={type} value={settings[k]||''} onChange={e=>set(k,e.target.value)} placeholder={placeholder} />
      }
    </div>
  )

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Site Settings</h1><p className="text-gray-500 mt-0.5">Manage your website content and contact info</p></div>
        <button onClick={save} className="btn-primary" disabled={saving}>
          {saved ? <><Check size={16} />Saved!</> : saving ? 'Saving...' : <><Save size={16} />Save Changes</>}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Upload Card */}
        <div className="card p-6 space-y-5 lg:col-span-2">
          <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">Brand & Logo</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-4">Upload your business logo. It will appear on the website header, footer, and admin panel. Recommended: PNG or SVG, max 500KB.</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
                id="logo-upload"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-outline text-sm py-2"
                >
                  <Upload size={15} /> {settings.logo ? 'Change Logo' : 'Upload Logo'}
                </button>
                {settings.logo && (
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="btn-outline text-sm py-2"
                    style={{borderColor:'#ef4444', color:'#ef4444'}}
                  >
                    <X size={15} /> Remove
                  </button>
                )}
              </div>
            </div>
            <div className="w-48 h-32 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50 shrink-0">
              {settings.logo ? (
                <img src={settings.logo} alt="Logo preview" style={{maxHeight:'100%', maxWidth:'100%', objectFit:'contain', padding:'0.5rem'}} />
              ) : (
                <div className="text-center text-gray-400">
                  <Image size={28} className="mx-auto mb-1 opacity-40" />
                  <p className="text-xs">No logo uploaded</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">Business Info</h2>
          <Field label="Business Name" k="site_name" />
          <Field label="Tagline" k="site_tagline" />
          <Field label="Phone Number" k="phone" placeholder="+251 9XX XXX XXX" />
          <Field label="Email Address" k="email" placeholder="info@yourbusiness.com" />
          <Field label="Address" k="address" placeholder="Addis Ababa, Ethiopia" />
          <Field label="Business Hours" k="business_hours" placeholder="Mon–Sat: 8AM–8PM | Sun: 10AM–5PM" />
        </div>
        <div className="card p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">Homepage Content</h2>
          <Field label="Hero Title" k="hero_title" placeholder="Your Local IT Expert" />
          <Field label="Hero Subtitle" k="hero_subtitle" type="textarea" placeholder="Fast, reliable, and affordable IT services..." />
        </div>
        <div className="card p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">Social Media Links</h2>
          <Field label="Facebook URL" k="facebook" placeholder="https://facebook.com/yourbusiness" />
          <Field label="Telegram URL" k="telegram" placeholder="https://t.me/yourbusiness" />
          <Field label="WhatsApp Number" k="whatsapp" placeholder="+251911234567 (numbers only)" />
        </div>
        <div className="card p-6">
          <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3 mb-5">Admin Account</h2>
          <p className="text-sm text-gray-500 mb-4">To change your password, contact your system administrator or update directly in the database.</p>
          <div className="p-4 rounded-xl bg-red-50 border border-red-100">
            <p className="text-sm font-medium text-red-800">Default Login</p>
            <p className="text-xs text-red-600 mt-1">Email: admin@techserve.com</p>
            <p className="text-xs text-red-600">Password: admin123</p>
            <p className="text-xs text-red-400 mt-2">⚠️ Change this password immediately in production</p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button onClick={save} className="btn-primary" disabled={saving}>
          {saved ? <><Check size={16} />Changes Saved!</> : saving ? 'Saving...' : <><Save size={16} />Save All Changes</>}
        </button>
      </div>
    </div>
  )
}
