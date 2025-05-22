import { pgTable, serial, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userTable } from './user';
import { crowdfundingTable } from './crowdfunding';

export const userDonorTable = pgTable('user_donor', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  crowndfundingId: integer('crowndfunding_id').notNull(),
  amount: integer('amount').notNull(),
});

export const userDonorRelations = relations(userDonorTable, ({ one }) => ({
  user: one(userTable, {
    fields: [userDonorTable.userId],
    references: [userTable.id],
  }),
  crowdfunding: one(crowdfundingTable, {
    fields: [userDonorTable.crowndfundingId],
    references: [crowdfundingTable.id],
  }),
}));
