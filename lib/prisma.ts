import { PrismaClient } from '../node_modules/.prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// NOTE: DATABASE_URL is a Prisma Accelerate URL (prisma+postgres://…).
// It must NOT go through a driver adapter (PrismaPg expects a direct
// Postgres connection string and times out on Accelerate URLs) — pass it
// as accelerateUrl with the extension instead. Temporary until the
// Accelerate retirement (Dec 1, 2026); then switch to a direct URL +
// PrismaPg adapter.
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ accelerateUrl: process.env.DATABASE_URL }).$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
