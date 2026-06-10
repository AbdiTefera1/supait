'use client'
import { useState } from 'react'
import { Save, Check } from 'lucide-react'

export default function SettingsClient({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const set = (key: string, value: string) => setSettings(p => ({ ...p, [key]: value }))

  const save = async () => {
    setSaving(true)
    await fetch('/api/settings', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(settings) })
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, k: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        set(k, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const Field = ({ label, k, type='text', placeholder='' }: { label:string, k:string, type?:string, placeholder?:string }) => (
    <div>
      <label className="label">{label}</label>
      {type === 'textarea'
        ? <textarea className="input" rows={3} value={settings[k]||''} onChange={e=>set(k,e.target.value)} placeholder={placeholder} />
        : <input className="input" type={type} value={settings[k]||''} onChange={e=>set(k,e.target.value)} placeholder={placeholder} />
      }
    </div>
  )

  const ImageField = ({ label, k }: { label:string, k:string }) => (
    <div>
      <label className="label">{label}</label>
      <input className="input" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, k)} />
      {settings[k] && <img src={settings[k]} alt="Preview" className="mt-2 h-16 object-contain border p-1 rounded" />}
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
        <div className="card p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">Branding & Content</h2>
          <ImageField label="Site Logo" k="site_logo" />
          <Field label="Site Name" k="site_name" />
          <Field label="Site Tagline" k="site_tagline" />
          <Field label="Short Description (Footer)" k="site_description" type="textarea" placeholder="Your trusted local IT partner..." />
        </div>
        <div className="card p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">Business Info</h2>
          <Field label="Phone Number" k="contact_phone" placeholder="+251 9XX XXX XXX" />
          <Field label="Email Address" k="contact_email" placeholder="info@yourbusiness.com" />
          <Field label="Address" k="contact_address" placeholder="Addis Ababa, Ethiopia" />
          <Field label="Business Hours" k="business_hours" type="textarea" placeholder="Mon–Sat: 8AM–8PM&#10;Sun: 10AM–5PM" />
        </div>
        <div className="card p-6 space-y-5">
          <h2 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">Social Media Links</h2>
          <Field label="Facebook URL" k="social_facebook" placeholder="https://facebook.com/yourbusiness" />
          <Field label="Telegram URL" k="social_telegram" placeholder="https://t.me/yourbusiness" />
          <Field label="WhatsApp URL" k="social_whatsapp" placeholder="https://whatsapp.com/channel/..." />
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

