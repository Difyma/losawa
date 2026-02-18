import { NextResponse } from 'next/server'
import { prisma, withRetry } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const collections = await withRetry(() => 
      prisma.collection.findMany({
        orderBy: {
          name: 'asc',
        },
      })
    )

    return NextResponse.json(collections)
  } catch (error: any) {
    console.error('Error fetching collections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collections', details: error.message },
      { status: 500 }
    )
  }
}
