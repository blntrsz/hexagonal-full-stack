import { sql } from "drizzle-orm";
import { integer } from "drizzle-orm/sqlite-core";

export const id = {
  id: integer('id').primaryKey()
}

export const timestamps = {
  createdAt: integer('created_at').default(sql`(current_timestamp)`),
  updatedAt: integer('updated_at').$onUpdate(() => sql`(current_timestamp)`)
}
