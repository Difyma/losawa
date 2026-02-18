// Check DATABASE_URL immediately
console.log('=== PRISMA CONFIG ===')
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
console.log('DATABASE_URL length:', process.env.DATABASE_URL?.length || 0)

import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL
  
  console.log('Creating Prisma Client...')
  
  if (!databaseUrl) {
    console.error('ERROR: DATABASE_URL is not defined!')
    throw new Error('DATABASE_URL environment variable is not set')
  }

  // Log partial URL for debugging (hide password)
  const urlForLogging = databaseUrl.replace(/:[^:@]+@/, ':****@')
  console.log('Using DATABASE_URL:', urlForLogging)

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
