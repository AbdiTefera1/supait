import { prisma } from '@/lib/prisma'
import ContactsClient from './ContactsClient'

export default async function ContactsPage() {
  const contacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } })
  return <ContactsClient initialContacts={contacts} />
}
