import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { userTable } from "./user";

export const crowdfundingTable = pgTable("crowdfunding", {
  id: serial("id").primaryKey(),
  goal: integer("goal").notNull(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
  endDate: date("end_date").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  totalDonations: integer("total_donations").notNull().default(0),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const crowdfundingToUserTable = pgTable("crowdfunding_to_user", {
  crowdfundingId: integer("crowdfunding_id")
    .references(() => crowdfundingTable.id)
    .notNull(),
  userId: integer("user_id")
    .references(() => userTable.id)
    .notNull(),
});
