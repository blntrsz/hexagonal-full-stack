import { timestamps } from '@backend/core/util/sql';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const taskTable = sqliteTable('task', {
  id: integer('id').primaryKey(),
  userId: integer('user_id'),
  description: text('description').notNull(),
  done: integer('done', { mode: 'boolean' }).default(false).notNull(),
  ...timestamps,
})

