# Hackathon Starter: Next.js + Supabase + Drizzle

Based on the [official Vercel Supabase Starter](https://github.com/vercel/next.js/tree/canary/examples/with-supabase), pre-configured for the AI Bootcamp with Slow Creator Fund. Includes Drizzle ORM for type-safe database queries.

## What's Included

- **Next.js** (App Router) with TypeScript
- **Supabase** auth (email/password, sign up, forgot password, protected routes)
- **Drizzle ORM** for type-safe database queries (schema-first, auto-syncs to Supabase)
- **Tailwind CSS** + **shadcn/ui** components
- **Claude Code config** (CLAUDE.md + custom slash commands)
- **Automatic database migrations** on every Vercel deploy
- Ready to deploy on **Vercel**

## Quick Start

### 1. Clone and install

```bash
git clone git@github.com:TanookiLabs/hackathon-starter-drizzle.git my-project
cd my-project
npm install
```

### 2. Set up Supabase

- Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a new project
- Go to **Project Overview** and copy your **Project URL** and **Publishable key**
- Go to **Connect** (top of page) → **ORM** tab → select **Drizzle** → copy the `DATABASE_URL`

> ⚠️ **Important:** Supabase's Drizzle example uses port `6543` (Transaction Pooler), which breaks `db:push`. **Change the port to `5432`** (Session Pooler) before pasting into `.env.local`.
>
> It should look like: `postgresql://postgres.YOURREF:PASSWORD@aws-X-REGION.pooler.supabase.com:5432/postgres`

### 3. Configure environment

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and paste in your values:
- `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — your Supabase anon key
- `DATABASE_URL` — the connection string from above, with port changed to `5432`

> If you get a **password authentication error**, go to **Project Settings → Database → Reset database password** and update the password in your `DATABASE_URL`.

### 4. Push the database schema

```bash
npm run db:push
```

This creates the example `posts` table in your Supabase database. You can see it in the Supabase Table Editor.

### 5. Run it

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000) in your browser.

### 6. Deploy to Vercel

```bash
# Option A: Tell Claude Code
claude
> "Deploy this to Vercel"

# Option B: Use the Vercel dashboard
# Go to vercel.com/new → Import your GitHub repo → Deploy
```

Add your environment variables in Vercel → Settings → Environment Variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `DATABASE_URL`).

Database schema migrations run automatically on every deploy — the build command runs `drizzle-kit push` before `next build`, so your production database stays in sync with your code.

## Using Claude Code

This project comes with a `CLAUDE.md` and custom slash commands pre-configured. Open Claude Code in this directory and try:

| Command      | What It Does                                                       |
| ------------ | ------------------------------------------------------------------ |
| `/plan`      | Turn your idea into a requirements + build plan                    |
| `/build`     | Execute the plan step by step                                      |
| `/add-table` | Add a new table to the Drizzle schema                              |
| `/add-ai`    | Add an AI feature (image gen, text gen, chat)                      |
| `/design`    | Build or redesign a UI from a description                          |
| `/fix`       | Debug and fix the current error                                    |
| `/snapshot`  | Save a local git checkpoint                                        |
| `/deploy`    | Commit, push to GitHub, and deploy (schema migrates automatically) |
| `/help`      | Show all available commands and tips                                |

## Adding Features

Tell Claude Code what you want to add. Some examples:

- "Add a dashboard page that shows a list of my brand deals"
- "Add image generation using Replicate — let users describe an image and generate it"
- "Add a contact form that saves submissions to the database"
- "Add Stripe checkout so users can buy my digital products"

## Database with Drizzle ORM

Your database schema is defined in `lib/db/schema.ts`. This is the single source of truth for your tables.

### Define a table

```typescript
// lib/db/schema.ts
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
})
```

### Sync to database

```bash
npm run db:push
```

This pushes your schema to the dev database (from `.env.local`). When you deploy to Vercel, the same command runs automatically against the production database.

### Query data

```typescript
import { db } from "@/lib/db/drizzle"
import { products } from "@/lib/db/schema"

// Read all
const allProducts = await db.select().from(products)

// Insert
await db.insert(products).values({ name: "T-Shirt", price: 2500 })

// Filter
const cheap = await db.select().from(products).where(lt(products.price, 1000))
```

### Browse data

```bash
npm run db:studio
```

Opens a visual data browser at localhost:4983.

## How Deployment Works

```
You edit lib/db/schema.ts locally
  → npm run db:push syncs to dev database
  → git push to GitHub
  → Vercel builds: runs drizzle-kit push (syncs prod database) then next build
  → Your app and database are both updated
```

No manual migration step. Code and schema deploy together.

## Project Structure

```
app/
  page.tsx                    ← Homepage
  layout.tsx                  ← Root layout (fonts, theme)
  globals.css                 ← Tailwind + CSS variables
  auth/
    login/page.tsx            ← Login page
    sign-up/page.tsx          ← Sign up page
    forgot-password/page.tsx  ← Password reset
    update-password/page.tsx  ← Update password
  protected/
    page.tsx                  ← Protected page (requires login)
components/
  ui/                         ← shadcn/ui components (button, card, input, etc.)
  auth-button.tsx             ← Login/logout button
  login-form.tsx              ← Login form component
  sign-up-form.tsx            ← Sign up form component
lib/
  db/
    drizzle.ts                ← Database client (Drizzle + postgres.js)
    schema.ts                 ← Database schema (define your tables here)
  supabase/
    client.ts                 ← Browser-side Supabase client (auth only)
    server.ts                 ← Server-side Supabase client (auth only)
  utils.ts                    ← cn() helper for classnames
drizzle.config.ts             ← Drizzle Kit configuration
.claude/
  commands/                   ← Custom Claude Code slash commands
CLAUDE.md                     ← Claude Code project config
.env.local.example            ← Environment variable template
```

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values you need:

| Variable                               | Required              | Where to Get It                                            |
| -------------------------------------- | --------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Yes                   | Supabase dashboard → Project Overview                      |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes                   | Supabase dashboard → Project Overview                      |
| `DATABASE_URL`                         | Yes                   | Supabase → Connect → ORM → Drizzle (change port to `5432`) |
| `REPLICATE_API_TOKEN`                  | For image/video gen   | replicate.com/account/api-tokens                           |
| `OPENAI_API_KEY`                       | For text gen (OpenAI) | platform.openai.com/api-keys                               |
| `STRIPE_SECRET_KEY`                    | For payments          | dashboard.stripe.com/apikeys                               |
| `RESEND_API_KEY`                       | For email             | resend.com/api-keys                                        |
