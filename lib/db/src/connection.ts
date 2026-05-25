import pg from "pg";

const { Pool } = pg;

function isSupabaseDatabaseUrl(url: string): boolean {
  return url.includes("supabase.co") || url.includes("supabase.com");
}

export function resolveDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL must be set. Get the connection string from Supabase → Project Settings → Database.",
    );
  }
  return url;
}

export function resolveMigrationDatabaseUrl(): string {
  return process.env.DATABASE_DIRECT_URL ?? resolveDatabaseUrl();
}

export function createDatabasePool(connectionString: string): pg.Pool {
  const config: pg.PoolConfig = { connectionString };

  if (isSupabaseDatabaseUrl(connectionString)) {
    config.ssl = { rejectUnauthorized: false };
  }

  return new Pool(config);
}
