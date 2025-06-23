import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

config()

if (!process.env.DATABASE_URL && process.env.NODE_ENV !== "test") {
  throw new Error("DATABASE_URL is not set")
}

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDatabase = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

const conn = globalForDatabase.conn ?? postgres(process.env.DATABASE_URL!)
if (process.env.NODE_ENV !== "production") globalForDatabase.conn = conn

// eslint-disable-next-line unicorn/prevent-abbreviations
export const db = drizzle(conn)
