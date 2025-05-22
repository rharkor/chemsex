import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './user';
import { crowdfundings } from './crowdfunding';

export const userDonors = pgTable('user_donors', {
  id: varchar('id', { length: 36 }).primaryKey(),
  userId: varchar('user_id', { length: 36 }).notNull(),
  crowndfundingId: varchar('crowndfunding_id', { length: 36 }).notNull(),
  amount: integer('amount').notNull(),
});

export const userDonorRelations = relations(userDonors, ({ one }) => ({
  user: one(users, {
    fields: [userDonors.userId],
    references: [users.id],
  }),
  crowdfunding: one(crowdfundings, {
    fields: [userDonors.crowndfundingId],
    references: [crowdfundings.id],
  }),
}));
