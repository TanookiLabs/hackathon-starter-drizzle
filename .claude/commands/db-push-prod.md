Push the current Drizzle schema to the production database.

This is needed because Vercel deploys your code automatically when you merge to main, but it does NOT update the database schema. You need to push schema changes separately.

Steps:

1. Read lib/db/schema.ts to understand what tables and columns are defined
2. Ask the user for their production DATABASE_URL (the connection string for their prod Supabase project). Do NOT use the value from .env.local — that is the dev database.
3. Run the schema push against the production database:
   ```
   DATABASE_URL="<prod-connection-string>" npx drizzle-kit push
   ```
4. Show the user what tables/columns were created or updated
5. Remind the user: this only needs to happen when lib/db/schema.ts changes. Code-only changes deploy automatically via Vercel.
6. Do NOT save the production DATABASE_URL to any file. It should only be stored in Vercel environment variables, not locally.
