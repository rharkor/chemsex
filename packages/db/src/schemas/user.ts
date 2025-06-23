import { pgTable, serial, text, uniqueIndex } from "drizzle-orm/pg-core"

export const userTable = pgTable(
  "user",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    username: text("username").notNull(),
  },
  (user) => [uniqueIndex("unique_email").on(user.email), uniqueIndex("unique_username").on(user.username)]
)
