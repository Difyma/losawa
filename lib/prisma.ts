import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  const databaseUrl = process.env.DATABASE_URL
  
  console.log('Prisma Client initializing...')
  console.log('DATABASE_URL exists:', !!databaseUrl)
  console.log('NODE_ENV:', process.env.NODE_ENV)
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set')
  }

  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
