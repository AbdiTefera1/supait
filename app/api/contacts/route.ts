import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(contacts)
}

export async function POST(request: NextRequest) {
  const data = await request.json()
  const { name, email, phone, subject, message } = data
  if (!name || !email || !subject || !message) return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
  const contact = await prisma.contact.create({ data: { name, email, phone, subject, message } })
  return NextResponse.json(contact, { status: 201 })
}
