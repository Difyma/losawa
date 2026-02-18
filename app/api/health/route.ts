import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Test database connection
    console.log('Health check - testing DB connection...')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    
    await prisma.$connect()
    console.log('DB connected successfully')
    
    // Try a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Test query result:', result)
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      }
    })
  } catch (error: any) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'error',
      error: error.message,
      code: error.code,
      env: {
        nodeEnv: process.env.NODE_ENV,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
      }
    }, { status: 500 })
  }
}
