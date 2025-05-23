import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { userTable } from "./user";
import { crowdfundingTable } from "./crowdfunding";

export const donationTable = pgTable("donation", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
  crowndfundingId: integer("crowndfunding_id")
    .references(() => crowdfundingTable.id)
    .notNull(),
  amount: integer("amount").notNull(),
});
