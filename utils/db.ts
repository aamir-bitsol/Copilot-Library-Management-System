import { PrismaClient } from '@prisma/client';

// Ensure a single PrismaClient instance is used in development to avoid hot-reloading issues
const prisma = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') globalThis.prisma = prisma;

if (!prisma) {
  throw new Error('Prisma client is not initialized. Check your database connection and Prisma setup.');
}

export const db = prisma;
