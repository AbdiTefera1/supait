import { PrismaClient, BookingStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const hashed = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@supait.com' },
    update: {},
    create: { email: 'admin@supait.com', password: hashed, name: 'Admin', role: 'ADMIN' }
  })

  // Site settings
  const settings = [
    { key: 'site_name', value: 'Supa IT' },
    { key: 'site_tagline', value: 'Your Local IT Expert — Fast, Reliable, Affordable' },
    { key: 'phone', value: '+251 940 050 709 / +251 714 088 343' },
    { key: 'email', value: 'info@supait.com' },
    { key: 'address', value: 'Addis Ababa, Ethiopia' },
    { key: 'facebook', value: 'https://facebook.com/supa_it' },
    { key: 'telegram', value: 'https://t.me/supa_it' },
    { key: 'whatsapp', value: '+251940050709' },
    { key: 'hero_title', value: 'Your Local IT Expert' },
    { key: 'hero_subtitle', value: 'Fast, reliable, and affordable IT services for homes and businesses. We come to you!' },
    { key: 'business_hours', value: 'Mon–Sat: 8AM–8PM | Sun: 10AM–5PM' },
  ]
  for (const s of settings) {
    await prisma.siteSettings.upsert({ where: { key: s.key }, update: { value: s.value }, create: { key: s.key, value: s.value } })
  }

  // Services
  const services = [
    { title: 'Virus & Malware Removal', slug: 'virus-removal', shortDesc: 'Complete virus removal and PC security cleanup', description: 'Full system scan and removal of all viruses, malware, spyware, and adware. Includes security software installation and prevention tips.', icon: 'Shield', price: '300–1,000 ETB', duration: '1–3 hours', category: 'Security', featured: true, order: 1 },
    { title: 'Data Recovery', slug: 'data-recovery', shortDesc: 'Recover lost files, photos, and documents', description: 'Professional data recovery from crashed hard drives, accidentally deleted files, and formatted storage devices.', icon: 'HardDrive', price: '500–2,500 ETB', duration: '2–6 hours', category: 'Data', featured: true, order: 2 },
    { title: 'PC Setup & Software Install', slug: 'pc-setup', shortDesc: 'Complete Windows/Linux setup and software installation', description: 'Full computer setup including OS installation, driver updates, Microsoft Office, and all required software. New PC migration included.', icon: 'Monitor', price: '300–1,200 ETB', duration: '1–4 hours', category: 'Setup', featured: true, order: 3 },
    { title: 'Network & Wi-Fi Setup', slug: 'network-setup', shortDesc: 'Home and office network configuration', description: 'Complete Wi-Fi and network setup including router configuration, internet troubleshooting, and office networking.', icon: 'Wifi', price: '400–1,500 ETB', duration: '1–3 hours', category: 'Network', featured: true, order: 4 },
    { title: 'Website Development', slug: 'website-development', shortDesc: 'Professional websites for businesses', description: 'Custom website design and development. Mobile-responsive, fast, and optimized for search engines. Includes Google Business Profile setup.', icon: 'Globe', price: '3,000–20,000 ETB', duration: '3–14 days', category: 'Digital', featured: true, order: 5 },
    { title: 'Monthly IT Support', slug: 'monthly-support', shortDesc: 'Ongoing IT support and maintenance', description: 'Monthly IT support contract with regular visits, remote support, security updates, and backup monitoring. Best value for businesses.', icon: 'Headphones', price: '500–6,000 ETB/mo', duration: 'Ongoing', category: 'Support', featured: true, order: 6 },
    { title: 'Password Reset', slug: 'password-reset', shortDesc: 'Recover access to locked computers and accounts', description: 'Quick and professional recovery of locked Windows accounts, BIOS passwords, and general account access restoration.', icon: 'Lock', price: '150–500 ETB', duration: '30–60 min', category: 'Setup', featured: false, order: 7 },
    { title: 'Printer Setup', slug: 'printer-setup', shortDesc: 'Printer installation and troubleshooting', description: 'Setup and configuration of all printer types including network printers, drivers installation, and troubleshooting print issues.', icon: 'Printer', price: '200–700 ETB', duration: '30–90 min', category: 'Setup', featured: false, order: 8 },
    { title: 'Parental Controls', slug: 'parental-controls', shortDesc: 'Keep your children safe online', description: 'Complete parental control setup including website blocking, screen time limits, and content filtering across all devices.', icon: 'Users', price: '300–1,000 ETB', duration: '1–2 hours', category: 'Security', featured: false, order: 9 },
    { title: 'Computer Training', slug: 'computer-training', shortDesc: 'Learn computer and software skills', description: 'One-on-one computer training for beginners and intermediate users. Covers Windows, Microsoft Office, internet, and specialized software.', icon: 'BookOpen', price: '200–600 ETB/hr', duration: 'Per hour', category: 'Training', featured: false, order: 10 },
    { title: 'Backup Solutions', slug: 'backup-solutions', shortDesc: 'Protect your data with automated backups', description: 'Setup automated backup systems for your important files, photos, and business data. Local and cloud backup options available.', icon: 'Cloud', price: '400–1,200 ETB', duration: '1–2 hours', category: 'Data', featured: false, order: 11 },
    { title: 'Google Business Profile', slug: 'google-business', shortDesc: 'Get your business found on Google', description: 'Complete Google Business Profile setup and optimization including photos, hours, services, and basic SEO to help customers find you.', icon: 'Search', price: '500–2,000 ETB', duration: '2–4 hours', category: 'Digital', featured: false, order: 12 },
  ]
  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: {}, create: s })
  }

  // Testimonials
  const testimonials = [
    { name: 'Abebe Girma', role: 'Restaurant Owner', content: 'TechServe Pro set up our entire network and POS system in one day. Incredible service, very professional and affordable. Highly recommend!', rating: 5, order: 1 },
    { name: 'Sara Tekle', role: 'Home User', content: 'My computer had a bad virus and I thought I lost everything. They recovered all my files and cleaned the whole system. Amazing work!', rating: 5, order: 2 },
    { name: 'Dr. Michael Haile', role: 'Clinic Director', content: 'We now have a monthly IT support contract. Our systems never go down anymore and staff training was excellent. Worth every birr.', rating: 5, order: 3 },
    { name: 'Tigist Alemu', role: 'Boutique Owner', content: 'They built our website and Google Business Profile. We are getting new customers every week from online searches now!', rating: 5, order: 4 },
  ]
  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { name: t.name } })
    if (!exists) await prisma.testimonial.create({ data: t })
  }

  // Sample bookings
  const bookings = [
    { name: 'Kebede Worku', email: 'kebede@email.com', phone: '0911111111', service: 'Virus & Malware Removal', date: new Date('2026-06-15'), timeSlot: '10:00 AM', status: 'PENDING' as BookingStatus, address: 'Bole, Addis Ababa' },
    { name: 'Mekdes Tadesse', email: 'mekdes@email.com', phone: '0922222222', service: 'PC Setup & Software Install', date: new Date('2026-06-16'), timeSlot: '2:00 PM', status: 'CONFIRMED' as BookingStatus, address: 'Kazanchis, Addis Ababa' },
    { name: 'Yonas Bekele', email: 'yonas@email.com', phone: '0933333333', service: 'Network & Wi-Fi Setup', date: new Date('2026-06-14'), timeSlot: '11:00 AM', status: 'COMPLETED' as BookingStatus, address: 'Sarbet, Addis Ababa' },
  ]
  for (const b of bookings) {
    const exists = await prisma.booking.findFirst({ where: { email: b.email } })
    if (!exists) await prisma.booking.create({ data: b })
  }

  console.log('✅ Seed complete')
}

main().catch(console.error).finally(() => prisma.$disconnect())
