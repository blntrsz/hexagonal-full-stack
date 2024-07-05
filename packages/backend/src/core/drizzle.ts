import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = process.env.NODE_ENV === 'test' ? new Database(':memory:') : new Database('sqlite.db');
export const database = drizzle(sqlite);
