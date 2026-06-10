import { prisma } from '@/lib/prisma'
import SettingsClient from './SettingsClient'

export default async function SettingsPage() {
  const rows = await prisma.siteSettings.findMany()
  const settings: Record<string, string> = {}
  rows.forEach(r => { settings[r.key] = r.value })
  return <SettingsClient initialSettings={settings} />
}
