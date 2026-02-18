import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET all banners
export async function GET() {
  try {
    await requireAdmin()
    
    const banners = await prisma.banner.findMany({
      orderBy: {
        order: 'asc',
      },
    })
    
    return NextResponse.json(banners)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error fetching banners:', error)
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    )
  }
}

// POST create new banner
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
    
    const body = await request.json()
    const { title, subtitle, image, link, order, isActive } = body
    
    if (!title || !image) {
      return NextResponse.json(
        { error: 'Title and image are required' },
        { status: 400 }
      )
    }
    
    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle,
        image,
        link,
        order: order || 0,
        isActive: isActive ?? true,
      },
    })
    
    return NextResponse.json(banner)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating banner:', error)
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    )
  }
}
