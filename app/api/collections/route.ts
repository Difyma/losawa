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
  } catch (error: any) {
    console.error('Error fetching collections:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch collections', 
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    )
  }
}
