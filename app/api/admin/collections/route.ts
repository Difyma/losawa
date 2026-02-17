import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - List all collections
export async function GET() {
  try {
    await requireAdmin()

    const collections = await prisma.collection.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return NextResponse.json(collections)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error fetching collections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}

// POST - Create collection
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const {
      name,
      slug,
      description,
      image,
      subtitle,
      quote,
      fullDescription,
    } = body

    if (!name || !slug || !description || !image) {
      return NextResponse.json(
        { error: 'Name, slug, description and image are required' },
        { status: 400 }
      )
    }

    const collection = await prisma.collection.create({
      data: {
        name,
        slug,
        description,
        image,
        subtitle,
        quote,
        fullDescription,
      },
    })

    return NextResponse.json(collection, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Collection with this slug already exists' },
        { status: 400 }
      )
    }
    console.error('Error creating collection:', error)
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    )
  }
}
