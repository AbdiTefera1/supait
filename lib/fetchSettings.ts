import { prisma } from './prisma'

export async function fetchSettings(): Promise<Record<string, string>> {
  const rows = await prisma.siteSettings.findMany()
  const settings: Record<string, string> = {}
  for (const row of rows) {
    settings[row.key] = row.value
  }
  return settings
}
