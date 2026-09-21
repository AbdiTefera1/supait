import { unstable_cache } from 'next/cache'
import { cache } from 'react'
import { prisma } from './prisma'

// Default fallback settings — returned when DB is unreachable
const DEFAULT_SETTINGS: Record<string, string> = {
  site_name: 'SupaIT',
  site_tagline: 'Business IT Services',
  phone: '+251 940 050 709',
  email: 'info@supait.com',
  address: 'Addis Ababa, Ethiopia',
  business_hours: 'Mon–Sat: 8AM–8PM',
  hero_title: 'Your Business IT Partner',
  hero_subtitle: 'Reliable IT support for small, medium, and large businesses.',
}

// unstable_cache: caches settings in the Next.js Data Cache for 60 seconds.
// This means a DB query fires at most once per minute across ALL visitors,
// instead of once per request.
const getCachedSettings = unstable_cache(
  async (): Promise<Record<string, string>> => {
    try {
      const rows = await prisma.siteSettings.findMany({
        select: { key: true, value: true },
      })
      const settings: Record<string, string> = { ...DEFAULT_SETTINGS }
      for (const row of rows) {
        settings[row.key] = row.value
      }
      return settings
    } catch (err) {
      console.error('[fetchSettings] DB error — using defaults:', err)
      return DEFAULT_SETTINGS
    }
  },
  ['site-settings'],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: ['site-settings'],
  }
)

// React cache: deduplicates calls within a single render pass.
// If layout AND a page both call fetchSettings(), only ONE DB/cache
// lookup happens per request.
export const fetchSettings = cache(getCachedSettings)
