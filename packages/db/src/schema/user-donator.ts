import { pgTable, varchar, serial, integer } from 'drizzle-orm/pg-core';

export const userDonorTable = pgTable('user_donor', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  crowndfundingId: varchar('crowndfunding_id', { length: 36 }).notNull(),
  amount: integer('amount').notNull(),
});