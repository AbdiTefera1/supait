import { prisma } from '@/lib/prisma'
import BookingsClient from './BookingsClient'

export default async function BookingsPage() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' } })
  return <BookingsClient initialBookings={bookings} />
}
