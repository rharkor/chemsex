import { pgTable, text, serial, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { crowdfundingTable } from './crowdfunding';
import { userDonorTable } from './user-donator';

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  username: text('username').notNull(),

}, (user) => ({
  uniqueEmail: uniqueIndex('unique_email').on(user.email),
  uniqueUsername: uniqueIndex('unique_username').on(user.username),
}));

export const userRelations = relations(userTable, ({ many }) => ({
  crowdfundings: many(crowdfundingTable),
  donations: many(userDonorTable),
}));
