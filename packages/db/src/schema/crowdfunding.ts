import { pgTable, varchar, integer, date, text } from 'drizzle-orm/pg-core';

export const crowdfundingTable = pgTable('crowdfunding', {
  id: varchar('id', { length: 36 }).primaryKey(),
  goal: integer('goal').notNull(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  endDate: date('end_date').notNull(),
  name: text('name').notNull(),
});

