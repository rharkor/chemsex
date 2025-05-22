import { pgTable, varchar, integer, date, text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './user';
import { userDonors } from './userDonator';

export const crowdfundings = pgTable('crowdfundings', {
  id: varchar('id', { length: 36 }).primaryKey(),
  goal: integer('goal').notNull(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  endDate: date('end_date').notNull(),
  name: text('name').notNull(),
});

export const crowdfundingRelations = relations(crowdfundings, ({ one, many }) => ({
  organiser: one(users, {
    fields: [crowdfundings.userId],
    references: [users.id],
  }),
  donations: many(userDonors),
}));
