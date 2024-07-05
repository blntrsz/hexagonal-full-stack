import { timestamps } from '@backend/core/util/sql';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: integer('id').primaryKey(),
  email: text('email').notNull(),
  ...timestamps,
})
