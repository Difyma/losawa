import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    const count = await prisma.product.count()
    const collections = await prisma.collection.findMany({
      take: 1,
    })
    
    return NextResponse.json({
      success: true,
      productCount: count,
      databaseUrl: process.env.DATABASE_URL,
      hasCollections: collections.length > 0,
    })
  } catch (error) {
    console.error('Database test error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        databaseUrl: process.env.DATABASE_URL,
      },
      { status: 500 }
    )
  }
}
