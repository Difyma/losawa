import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'
import { join } from 'path'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Get database URL
const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db'
// Convert relative path to absolute for better-sqlite3
const dbPath = databaseUrl.replace('file:', '')
const absoluteDbPath = dbPath.startsWith('/') ? dbPath : join(process.cwd(), dbPath)

// Create adapter - pass url and options
const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
  // Additional better-sqlite3 options can be added here if needed
})

// Create Prisma Client with adapter
function createPrismaClient() {
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma =
  globalThis.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
