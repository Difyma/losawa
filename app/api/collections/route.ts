import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Log for debugging
    console.log('DATABASE_URL:', process.env.DATABASE_URL)
    const collections = await prisma.collection.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(collections)
  } catch (error) {
    console.error('Error fetching collections:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Full error:', errorMessage)
    return NextResponse.json(
      { error: 'Failed to fetch collections', details: errorMessage },
      { status: 500 }
    )
  }
}
