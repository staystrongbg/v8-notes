// Accelerate -> direct Postgres runbook (~10 lines):
// 1. In .env set DATABASE_URL to the POOLED direct connection string
//    (postgresql://…:6543/…?pgbouncer=true). Not prisma+postgres://.
// 2. Optionally set DIRECT_DATABASE_URL to the non-pooled port for migrations.
// 3. bunx prisma migrate status  (expect: database schema is up to date)
// 4. bun run dev  (restart so the new URL is picked up)
// 5. Smoke-test sign-in; it exercises a better-auth session lookup on Postgres.
// Note: lib/prisma.ts now uses the PrismaPg driver adapter; the
// Accelerate extension has been removed.
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // DIRECT_DATABASE_URL (non-pooled, for session-level migrations) with
    // fallback to DATABASE_URL. process.env is used instead of env() because
    // env() throws on missing keys and DIRECT_DATABASE_URL is optional.
    url: process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL ?? '',
  },
});