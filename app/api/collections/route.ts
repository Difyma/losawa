import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('API Collections called')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    
    const collections = await prisma.collection.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    console.log('Collections fetched:', collections.length)

    return NextResponse.json(collections)
  } catch (error) {
    console.error('Error fetching collections:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : ''
    console.error('Full error:', errorMessage)
    console.error('Stack:', errorStack)
    return NextResponse.json(
      { error: 'Failed to fetch collections', details: errorMessage },
      { status: 500 }
    )
  }
}
