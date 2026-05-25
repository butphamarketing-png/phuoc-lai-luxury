import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { createDatabasePool, resolveDatabaseUrl } from "./connection";

export const pool = createDatabasePool(resolveDatabaseUrl());
export const db = drizzle(pool, { schema });

export * from "./schema";
export * from "./connection";
export { getSupabaseAdmin } from "./supabase";
