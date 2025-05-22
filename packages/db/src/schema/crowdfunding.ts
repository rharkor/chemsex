import { pgTable, serial, integer, date, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userTable } from './user';
import { userDonorTable } from './user-donator';

export const crowdfundingTable = pgTable('crowdfunding', {
  id: serial('id').primaryKey(),
  goal: integer('goal').notNull(),
  userId: integer('user_id').notNull(),
  endDate: date('end_date').notNull(),
  name: text('name').notNull(),
});

export const crowdfundingRelations = relations(crowdfundingTable, ({ one, many }) => ({
  organiser: one(userTable, {
    fields: [crowdfundingTable.userId],
    references: [userTable.id],
  }),
  donations: many(userDonorTable),
}));
