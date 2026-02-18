import { NextResponse } from 'next/server'
import { prisma, withRetry } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const categories = await withRetry(() => 
      prisma.category.findMany({
        orderBy: {
          name: 'asc',
        },
      })
    )

    return NextResponse.json(categories)
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories', details: error.message },
      { status: 500 }
    )
  }
}
