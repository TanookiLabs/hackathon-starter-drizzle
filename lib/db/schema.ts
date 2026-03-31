import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core"

// Example table — replace or extend this with your own data model.
// After editing, run: npm run db:push
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  published: boolean("published").default(false).notNull(),
  authorId: uuid("author_id").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
})

// Type helpers — use these in your server actions and components
export type Post = typeof posts.$inferSelect
export type NewPost = typeof posts.$inferInsert
