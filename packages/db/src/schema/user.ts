import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: varchar('id', { length: 36 }).primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  username: text('username').notNull(),
});