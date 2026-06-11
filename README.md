# Living Legend

**Build the man. Become the legend.**

Private, masculine self-mastery platform built with Next.js, Clerk, Prisma, and deployed on Railway.

## Tech Stack
- Next.js 15 (App Router) + Tailwind + shadcn/ui style components
- Clerk for authentication & protected routes
- Prisma + PostgreSQL (Railway)
- Dark masculine theme with gold accents

## Local Development

```bash
npm install
cp .env.example .env.local
# Add your Clerk keys and DATABASE_URL
npx prisma generate
npx prisma db push
npm run dev
```

## Railway Deployment

1. Push to GitHub.
2. Create new Railway project → Deploy from GitHub.
3. Add **Postgres** plugin in Railway (it will provide `DATABASE_URL`).
4. Add environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL` (auto from Postgres plugin)
   - `ADMIN_EMAIL` (your email for /admin access)
5. Railway will run `prisma generate` during build (see package.json).

## Key Pages
- `/` — Beautiful marketing homepage
- `/sign-in`, `/sign-up` — Clerk auth
- `/dashboard` — Daily practice (score, streak, quick wins, journal, carousel)
- `/assessment` — 11-question step-by-step assessment + Legend Snapshot
- `/classes` — Full library of 10 mini master classes
- `/admin` — Owner-only command center (users, finances, activity, content mgmt, security)

## Notes
- All sensitive routes are protected by Clerk middleware.
- Admin access is gated by `ADMIN_EMAIL`.
- Data persistence via Prisma (journal, classes, activity). Currently demo-enhanced with localStorage for instant feel.
- No social feed. Purely private.

Run `npm run db:studio` to explore the database locally.
