import { prisma } from './prisma'

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const settings = await prisma.siteSettings.findMany()
    const settingsMap: Record<string, string> = {}
    settings.forEach(s => {
      settingsMap[s.key] = s.value
    })
    return settingsMap
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return {}
  }
}
