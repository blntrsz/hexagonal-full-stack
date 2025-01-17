import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: "./src/**/*.sql.ts",
  dialect: 'sqlite',
  dbCredentials: {
    url: './sqlite.db'
  },
  verbose: true,
  strict: true,
})
