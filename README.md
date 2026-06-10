# TechServe Pro — Complete IT Services Website

A full-stack Next.js website with CMS, booking management, and admin panel for a local IT services business.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL via Prisma ORM
- **Auth:** Custom JWT (bcryptjs + jsonwebtoken) — NO NextAuth
- **Styling:** Tailwind CSS + custom CSS (brand colors: #b31942, #ffffff)
- **Language:** TypeScript

---

## Project Structure

```
techserve/
├── app/
│   ├── (public)/               # Public-facing website
│   │   ├── layout.tsx          # Navbar + Footer wrapper
│   │   ├── page.tsx            # Homepage
│   │   ├── services/           # Services listing
│   │   ├── packages/           # Pricing packages
│   │   ├── booking/            # Client booking form
│   │   ├── contact/            # Contact page
│   │   └── blog/               # Blog listing
│   ├── (admin)/
│   │   └── admin/              # Protected admin area
│   │       ├── layout.tsx      # JWT auth guard + sidebar
│   │       ├── page.tsx        # Dashboard with stats
│   │       ├── bookings/       # Booking management
│   │       ├── services/       # Service catalog CMS
│   │       ├── blog/           # Blog post CMS
│   │       ├── contacts/       # Message inbox
│   │       ├── testimonials/   # Testimonial manager
│   │       └── settings/       # Site settings CMS
│   ├── admin-login/            # Login page
│   └── api/
│       ├── auth/login          # POST - JWT login
│       ├── auth/logout         # POST - clear cookie
│       ├── auth/me             # GET - current user
│       ├── bookings/           # GET (admin), POST (public)
│       ├── bookings/[id]       # PATCH, DELETE
│       ├── services/           # GET (public), POST (admin)
│       ├── services/[id]       # PUT, DELETE
│       ├── contacts/           # GET (admin), POST (public)
│       ├── contacts/[id]       # PATCH
│       ├── testimonials/       # GET, POST
│       ├── testimonials/[id]   # PUT, DELETE
│       ├── blog/               # GET, POST
│       ├── blog/[id]           # PUT, DELETE
│       ├── settings/           # GET (public), POST (admin)
│       └── admin/stats         # GET dashboard stats
├── components/
│   ├── public/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── BookingForm.tsx     # Client-side booking form
│   │   ├── ContactForm.tsx     # Client-side contact form
│   │   └── ServiceIcon.tsx     # Dynamic Lucide icons
│   └── admin/
│       └── AdminSidebar.tsx
├── lib/
│   ├── prisma.ts               # Prisma singleton
│   └── auth.ts                 # JWT helpers
├── prisma/
│   ├── schema.prisma           # All DB models
│   └── seed.ts                 # Sample data seeder
└── .env.local                  # Environment variables
```

---

## Database Models

| Model | Description |
|-------|-------------|
| `User` | Admin users with hashed passwords |
| `Booking` | Client service bookings with status tracking |
| `Service` | Service catalog (fully editable via CMS) |
| `Testimonial` | Client reviews shown on homepage |
| `BlogPost` | Blog articles with tags and publish control |
| `Contact` | Contact form submissions / inbox |
| `SiteSettings` | Key-value store for all website content |
| `Page` | (Reserved) Custom pages |

---

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- PostgreSQL database running locally or hosted (Supabase, Railway, Neon, etc.)

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
Edit `.env.local`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your-super-secret-key-at-least-32-chars"
```

### 4. Set up the database
```bash
# Push schema to database
npm run db:push

# Seed with sample data (services, admin user, testimonials)
npm run db:seed
```

### 5. Run the development server
```bash
npm run dev
```

Visit: http://localhost:3000

---

## Admin Access

- **URL:** http://localhost:3000/admin-login
- **Email:** admin@techserve.com
- **Password:** admin123

⚠️ **Change the password immediately in production!**

To change password, run in your DB:
```sql
UPDATE "User" SET password = '<bcrypt-hash>' WHERE email = 'admin@techserve.com';
```
Or add a `/admin/change-password` route.

---

## CMS Capabilities (Admin Panel)

### 📅 Bookings Manager
- View all bookings with full client details
- Filter by status: PENDING / CONFIRMED / IN_PROGRESS / COMPLETED / CANCELLED
- Search by name, service, or phone number
- Update booking status inline
- Delete bookings

### 🔧 Services CMS
- Add / edit / delete services
- Set title, description, price, duration, category
- Choose icon from 15 Lucide icons
- Mark services as featured or inactive
- Control display order

### ✍️ Blog CMS
- Write full blog posts with rich content
- Add tags for categorization
- Draft / Published state toggle
- Edit or delete posts

### 💬 Contacts Inbox
- View all contact form submissions
- Expand to read full message
- Mark as NEW / READ / REPLIED
- One-click "Reply via Email" button

### ⭐ Testimonials Manager
- Add / edit / delete testimonials
- Set star rating (1–5)
- Toggle visibility
- Control display order

### ⚙️ Site Settings
- Edit business name, phone, email, address
- Edit homepage hero title and subtitle
- Set social media links (Facebook, Telegram, WhatsApp)
- Change business hours
- All changes apply site-wide instantly

---

## Public Website Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, services, packages, testimonials, CTA |
| `/services` | Full services catalog with prices |
| `/packages` | Detailed package comparison |
| `/booking` | Client booking form (saves to DB) |
| `/contact` | Contact form + business info |
| `/blog` | Blog post listing |

---

## Authentication Flow

1. Admin visits `/admin-login`
2. Submits email + password
3. Server validates with bcrypt, signs JWT (7-day expiry)
4. JWT stored in **httpOnly cookie** (`ts_token`)
5. All `/admin/*` routes server-side check cookie
6. All `/api/*` admin routes check `Authorization: Bearer` header OR cookie
7. Logout clears cookie via `/api/auth/logout`

---

## Deployment

### Recommended: Vercel + Supabase (Free Tier)

1. **Database:** Create free PostgreSQL on [supabase.com](https://supabase.com)
2. **Deploy:** Push to GitHub → connect to [vercel.com](https://vercel.com)
3. **Env vars in Vercel:**
   - `DATABASE_URL` — from Supabase connection string
   - `JWT_SECRET` — generate with: `openssl rand -base64 32`
4. **Seed:** Run `npm run db:seed` once after first deploy

### Alternative: Railway
- One-click PostgreSQL + Next.js deploy on [railway.app](https://railway.app)

---

## Growing the Business → SaaS Path

The website is built CMS-first so you never need to redevelop:

- **Phase 1:** Edit services, pricing, content via Admin → Settings
- **Phase 2:** Add technicians as `STAFF` role users
- **Phase 3:** Add software products as new services
- **Phase 4:** Extend booking system with payment integration (Chapa ETB payments)
- **Phase 5:** Extend `Service` model to support SaaS subscriptions

---

## Future Enhancements Roadmap

- [ ] Email notifications (booking confirmation via Resend/SendGrid)
- [ ] SMS notifications via Africa's Talking API (Ethiopia)
- [ ] Chapa payment gateway integration (Ethiopian payments)
- [ ] Booking calendar view in admin
- [ ] Client portal (track booking status)
- [ ] Multi-technician assignment
- [ ] Invoice generation (PDF)
- [ ] WhatsApp Business API auto-reply
- [ ] Google Analytics integration
- [ ] Multi-language support (Amharic + English)

---

*Built with ❤️ for local IT entrepreneurs. Start small, grow big.*
