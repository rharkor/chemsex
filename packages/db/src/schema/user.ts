import { pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { crowdfundings } from './crowdfunding';
import { userDonors } from './userDonator';

export const users = pgTable('users', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  username: text('username').notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  crowdfundings: many(crowdfundings),
  donations: many(userDonors),
}));
