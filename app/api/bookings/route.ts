import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const where = status && status !== 'ALL' ? { status: status as any } : {}
  const bookings = await prisma.booking.findMany({ where, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(bookings)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, service, date, timeSlot, notes, address } = data
    if (!name || !email || !phone || !service || !date || !timeSlot)
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    const booking = await prisma.booking.create({
      data: { name, email, phone, service, date: new Date(date), timeSlot, notes, address }
    })
    return NextResponse.json(booking, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
