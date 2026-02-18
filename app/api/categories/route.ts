import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('API Categories called')
    
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    console.log('Categories fetched:', categories.length)
    return NextResponse.json(categories)
  } catch (error: any) {
    console.error('Error fetching categories:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    console.error('Error meta:', error.meta)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch categories', 
        details: error.message,
        code: error.code,
        meta: error.meta
      },
      { status: 500 }
    )
  }
}
