import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Check if we're in build/SSG phase
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build'

const prismaClientSingleton = () => {
  console.log('Creating Prisma Client...')
  console.log('Is build phase:', isBuildPhase)
  
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

// Helper function to retry queries on connection errors
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: any
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error: any) {
      lastError = error
      console.log(`Retry ${i + 1}/${maxRetries} failed:`, error.message)
      
      // Only retry on connection errors
      if (error.message?.includes('MaxClientsInSessionMode') || 
          error.message?.includes('Can''t reach database server')) {
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
          continue
        }
      }
      
      throw error
    }
  }
  
  throw lastError
}
