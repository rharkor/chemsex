import { pgTable, serial, integer, date, text } from "drizzle-orm/pg-core";
import { userTable } from "./user";

export const crowdfundingTable = pgTable("crowdfunding", {
  id: serial("id").primaryKey(),
  goal: integer("goal").notNull(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
  endDate: date("end_date").notNull(),
  name: text("name").notNull(),
});

export const crowdfundingToUserTable = pgTable("crowdfunding_to_user", {
  crowdfundingId: integer("crowdfunding_id")
    .references(() => crowdfundingTable.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
});
