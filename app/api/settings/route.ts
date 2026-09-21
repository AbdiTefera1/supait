import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findMany()
    const obj: Record<string, string> = {}
    settings.forEach(s => { obj[s.key] = s.value })
    return NextResponse.json(obj)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const data = await request.json()
    const updates = await Promise.all(
      Object.entries(data).map(([key, value]) =>
        prisma.siteSettings.upsert({
          where: { key },
          update: { value: value as string },
          create: { key, value: value as string },
        })
      )
    )
    return NextResponse.json({ success: true, count: updates.length })
  } catch {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
