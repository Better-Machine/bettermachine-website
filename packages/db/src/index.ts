import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";

let db: ReturnType<typeof drizzle> | null = null;

const dbPath = process.env.DATABASE_URL || "./data.sqlite";

try {
  const sqlite = new Database(dbPath);
  db = drizzle(sqlite, { schema });
} catch {
  // No DB available — public app builds on Hostinger don't have the DB.
  // Queries return empty arrays instead of crashing.
}

export { db };
export * from "./schema";
export * from "./queries";
export * from "./dispatch";
