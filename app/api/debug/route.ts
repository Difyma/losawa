import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    },
  }

  try {
    // Test basic Prisma connection
    debugInfo.prismaTest = 'starting...'
    
    const productCount = await prisma.product.count()
    debugInfo.productCount = productCount
    
    const collectionCount = await prisma.collection.count()
    debugInfo.collectionCount = collectionCount
    
    debugInfo.success = true
  } catch (error) {
    debugInfo.error = {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined,
    }
    debugInfo.success = false
  }

  return NextResponse.json(debugInfo, { status: debugInfo.success ? 200 : 500 })
}
