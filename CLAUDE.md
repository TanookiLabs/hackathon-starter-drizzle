# Project

This is a Next.js app with Supabase for the backend, built at the Slow Ventures Creator Fund AI Hackathon.

# Stack

- Next.js (App Router) with TypeScript
- Tailwind CSS + shadcn/ui for styling
- Supabase for auth and storage
- Drizzle ORM for database queries (type-safe, schema defined in lib/db/schema.ts)
- Deployed on Vercel

# Rules

- Use Server Actions for all backend logic (not API routes)
- Use Drizzle ORM (`db` from lib/db/drizzle.ts) for all database reads and writes
- Use the Supabase client from lib/supabase/server.ts for auth and storage only
- Use the Supabase client from lib/supabase/client.ts for client-side auth only
- Define all database tables in lib/db/schema.ts using Drizzle's pgTable API
- After changing the schema, run `npm run db:push` to sync changes to the database
- Export TypeScript types from the schema using `$inferSelect` and `$inferInsert`
- Use shadcn/ui components for UI elements (install with: pnpm dlx shadcn@latest add <component>)
- Use Tailwind CSS for styling, never inline styles
- Always handle errors in server actions and display them to the user
- Keep API keys in .env.local, never hardcode them
- Commit frequently with descriptive messages
- When creating new pages, add them to the app/ directory following Next.js App Router conventions
- File paths are routes: app/dashboard/page.tsx = /dashboard
