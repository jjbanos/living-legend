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

## Railway Deployment (Easiest way to preview the live site)

Since the full app is now committed (including homepage, protected dashboard with Legend Score + streak + quick wins + journal + carousel, 11-question assessment with snapshot, 10 mini master classes, Clerk auth, and full admin dashboard), here's the fastest path:

1. Push the code from your machine:
   ```powershell
   cd "C:\Users\JuanBanos\living-legend"
   git push
   ```

2. Go to https://railway.app
   - New Project → Deploy from GitHub
   - Select your repo `jjbanos/living-legend`

3. In the new Railway project:
   - Click **+ New** → **Database** → **PostgreSQL** (this automatically provides the `DATABASE_URL` variable)

4. Select your Next.js service → **Variables** tab → Add these (use your real values):
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` = pk_... (from your Clerk dashboard)
   - `CLERK_SECRET_KEY` = sk_... (from your Clerk dashboard)
   - `ADMIN_EMAIL` = the exact email you will use to sign up and access /admin

5. Railway detects Next.js and will run `prisma generate && next build` automatically (already configured in package.json).

6. Once the deploy finishes (green check), click the **public URL** (e.g. `https://your-app.up.railway.app`).

7. On the live site:
   - Sign up with Clerk using the ADMIN_EMAIL account
   - Visit `/dashboard`, `/assessment`, `/classes`
   - Visit `/admin` to see the full owner dashboard

**Notes for Railway preview:**
- You **must** use real Clerk keys (create one at clerk.com → new app if you don't have them yet).
- The first deploy may take 2-3 minutes.
- All routes are protected by Clerk middleware.
- The Postgres service is free for small usage during testing.

If you want to test locally instead:
```powershell
cd "C:\Users\JuanBanos\living-legend"
npm install
# Edit .env.local with real Clerk keys (and optionally a local Postgres URL)
npm run dev
```
Then open http://localhost:3000.

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
