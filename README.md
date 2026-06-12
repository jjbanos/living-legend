# Living Legend

**Build the man. Become the legend.**

Private, masculine self-mastery platform built with Next.js, self-hosted Auth.js, Prisma, and deployed on Railway. No third-party auth service — everything runs on Railway.

## Tech Stack
- Next.js 15 (App Router) + Tailwind + shadcn/ui style components
- Auth.js (NextAuth v5) — self-hosted email/password auth, bcrypt-hashed, JWT sessions
- Prisma + PostgreSQL (Railway)
- Dark masculine theme with gold accents

## Local Development

```bash
npm install
cp .env.example .env.local
# Set DATABASE_URL (any Postgres), AUTH_SECRET, ADMIN_EMAILS
npx prisma generate
npx prisma db push
npm run dev
```

Then open http://localhost:3000.

## Railway Deployment

The project lives at https://railway.app under **Living-Legend** with two services:

- **living-legend** — the Next.js app, auto-deploys from GitHub `main`
- **Postgres** — the database; `DATABASE_URL` is wired to the app via a reference variable

Required variables on the app service:

- `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (reference to the Postgres service)
- `AUTH_SECRET` = random 32+ byte secret (e.g. `openssl rand -base64 32`)
- `ADMIN_EMAILS` = comma-separated emails allowed into `/admin`

On every deploy Railway runs `prisma generate && next build`, then `npx prisma db push --skip-generate` (pre-deploy command in `railway.json`) to sync the schema before starting.

To deploy: push to `main`. Railway builds and ships automatically.

## Key Pages
- `/` — Beautiful marketing homepage
- `/sign-in`, `/sign-up` — Self-hosted email/password auth
- `/dashboard` — Daily practice (score, streak, quick wins, journal, carousel)
- `/assessment` — 11-question step-by-step assessment + Legend Snapshot
- `/classes` — Full library of 10 mini master classes
- `/admin` — Owner-only command center (users, finances, activity, content mgmt, security)

## Notes
- All sensitive routes are protected by Auth.js middleware (`middleware.ts` + `auth.config.ts`).
- Admin access is gated server-side by `ADMIN_EMAILS`.
- Accounts live in Postgres (`User` model, bcrypt password hashes). Dashboard data is currently demo-enhanced with localStorage for instant feel.
- No social feed. Purely private.

Run `npm run db:studio` to explore the database locally.
