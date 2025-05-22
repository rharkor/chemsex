import { pgTable, text, serial } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  username: text('username').notNull(),
});