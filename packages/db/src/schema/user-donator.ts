import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';

export const userDonors = pgTable('user_donors', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  crowndfundingId: varchar('crowndfunding_id', { length: 36 }).notNull(),
  amount: integer('amount').notNull(),
});