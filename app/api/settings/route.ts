import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  const settings = await prisma.siteSettings.findMany()
  const obj: Record<string, string> = {}
  settings.forEach(s => { obj[s.key] = s.value })
  return NextResponse.json(obj)
}

export async function POST(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await request.json()
  
  const updates = await Promise.all(
    Object.entries(data).map(async ([key, value]) => {
      let valStr = value as string
      
      if (valStr && valStr.startsWith('data:image/')) {
        const match = valStr.match(/^data:image\/([a-zA-Z0-9]+);base64,(.+)$/)
        if (match) {
          const ext = match[1] === 'jpeg' ? 'jpg' : match[1]
          const buffer = Buffer.from(match[2], 'base64')
          const filename = `${key}-${Date.now()}.${ext}`
          const uploadDir = path.join(process.cwd(), 'public', 'uploads')
          await fs.mkdir(uploadDir, { recursive: true })
          await fs.writeFile(path.join(uploadDir, filename), buffer)
          valStr = `/uploads/${filename}`
        }
      }

      return prisma.siteSettings.upsert({ 
        where: { key }, 
        update: { value: valStr }, 
        create: { key, value: valStr } 
      })
    })
  )
  return NextResponse.json({ success: true, count: updates.length })
}
