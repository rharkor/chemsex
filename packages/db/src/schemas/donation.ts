import { integer, pgTable, serial } from "drizzle-orm/pg-core"

import { crowdfundingTable } from "./crowdfunding"
import { userTable } from "./user"

export const donationTable = pgTable("donation", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
  crowndfundingId: integer("crowndfunding_id")
    .references(() => crowdfundingTable.id)
    .notNull(),
  amount: integer("amount").notNull(),
})
