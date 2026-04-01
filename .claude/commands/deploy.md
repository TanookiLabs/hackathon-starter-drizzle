Deploy the app: push code to GitHub (triggering Vercel) and sync the database schema if it changed.

Steps:

1. Check if lib/db/schema.ts has changed since the last commit (use `git diff` to check)
2. If the schema changed:
   - Run `npm run db:push` to sync the dev database (using DATABASE_URL from .env.local)
   - Ask the user if they have a separate production database. If yes:
     - Ask for the production DATABASE_URL (do NOT save it to any file)
     - Run `DATABASE_URL="<prod-connection-string>" npx drizzle-kit push` to sync the prod schema
   - If they only have one database, the dev push already handled it
3. Commit all changes to git with a descriptive commit message that summarizes what was changed
4. Push to GitHub
5. Confirm the Vercel deployment is building. Show the deployment URL when done.
6. Remind the user: Vercel picks up the code automatically, but they need to make sure their environment variables are set in Vercel Settings (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, DATABASE_URL).
