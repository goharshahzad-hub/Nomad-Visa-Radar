# Nomad Visa Radar

Premium SaaS website for searching, comparing, and monitoring digital nomad visa requirements worldwide.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- shadcn-style UI primitives
- Framer Motion
- Supabase PostgreSQL and Supabase Auth
- Vercel cron and deployment

## Local Setup

```bash
npm install
npm run dev
npm run verify
```

Copy `.env.example` to `.env.local` and add Supabase credentials.

## Supabase

Run the SQL files in order:

1. `supabase/schema.sql`
2. `supabase/seed.sql`

Enable Google as an Auth provider in Supabase, then add the local and production redirect URLs:

- `http://localhost:3000/auth/callback`
- `https://your-domain.com/auth/callback`

## Visa Intelligence System

`vercel.json` schedules `/api/visa-intelligence/daily` every day. The endpoint creates `editor_reviews` tasks from official visa information pages and never auto-publishes changes.

`/api/newsletter/weekly` sends the weekly digest to subscribed emails every Monday when `RESEND_API_KEY`, `EMAIL_FROM`, and `CRON_SECRET` are configured.

Use `CRON_SECRET` in production. Vercel Cron sends `Authorization: Bearer <secret>` when the secret is configured; use the same header for manual checks.

## Admin and Email Routing

`goharshahzad@gmail.com` is included in the Supabase admin email allowlist. When that Google account signs in, the profile role is set to `admin`.

Contact form queries are routed to `CONTACT_TO_EMAIL`, which defaults to `goharshahzad@gmail.com`. Email delivery uses Resend via `RESEND_API_KEY` and `EMAIL_FROM`. Local preview does not send real email unless those variables are configured, and the form will show a delivery configuration error instead of a false success.
