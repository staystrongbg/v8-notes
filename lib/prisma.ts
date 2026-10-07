import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../node_modules/.prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// NOTE: DATABASE_URL must be a direct (pooled) Postgres URL — not an
// Accelerate (prisma+postgres://) URL. Do NOT add statement_timeout here:
// this proxy rejects it at connect time ("Failed to connect to upstream
// database"). Per-query timeouts belong in application code if needed.
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
    }),
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
