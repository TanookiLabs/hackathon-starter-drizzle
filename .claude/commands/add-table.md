Create a new database table using Drizzle ORM. Ask the user what data they want to store.

Steps:

1. Determine the table name and columns based on the user's description
2. Add the table definition to lib/db/schema.ts using Drizzle's pgTable API
3. Export type helpers using $inferSelect and $inferInsert for the new table
4. Run `npm run db:push` to sync the schema to the Supabase database
5. If the table has a user_id/author_id column, add Row Level Security policies via Supabase SQL Editor:
   - Enable RLS: `alter table <table_name> enable row level security;`
   - Add read policy: `create policy "Anyone can read" on <table_name> for select using (true);`
   - Add write policy: `create policy "Users can manage their own rows" on <table_name> for all using (auth.uid() = <user_column>);`
6. Create a server action that uses `db` from lib/db/drizzle.ts to insert and query data
7. Show the user a quick example of how to use the new table in a component
