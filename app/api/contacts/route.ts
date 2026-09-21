import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(contacts)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, subject, message } = data
    if (!name || !email || !subject || !message)
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    const contact = await prisma.contact.create({ data: { name, email, phone, subject, message } })
    return NextResponse.json(contact, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to submit contact' }, { status: 500 })
  }
}
