import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

function createPrismaClient() {
  return new PrismaClient({
    // Cap connections to prevent overwhelming PostgreSQL
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: process.env.NODE_ENV === 'development'
      ? ['error', 'warn']
      : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Preserve the singleton in all environments to prevent connection leaks
if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = prisma
}
