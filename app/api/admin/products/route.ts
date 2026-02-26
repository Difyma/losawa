import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - List all products
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const categoryId = searchParams.get('categoryId')
    const collectionId = searchParams.get('collectionId')

    const where: any = {}

    if (search) {
      where.name = {
        contains: search,
      }
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (collectionId) {
      where.collectionId = collectionId
    }

    // Admin can see all products (active and inactive)

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        collection: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(products)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST - Create product
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const body = await request.json()
    const {
      name,
      price,
      image,
      material,
      description,
      categoryId,
      collectionId,
      isActive = true,
      additionalImages = [],
    } = body

    if (!name || !price || !image || !material || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Валидация количества изображений (максимум 4 дополнительных + 1 главное = 5)
    if (additionalImages.length > 4) {
      return NextResponse.json(
        { error: 'Maximum 4 additional images allowed' },
        { status: 400 }
      )
    }

    // Create product with images in transaction
    const product = await prisma.$transaction(async (tx) => {
      // Create product
      const newProduct = await tx.product.create({
        data: {
          name,
          price: parseFloat(price),
          image,
          material,
          description,
          categoryId,
          collectionId: collectionId || null,
          isActive,
        },
      })

      // Create additional images
      if (additionalImages.length > 0) {
        await tx.productImage.createMany({
          data: additionalImages.map((img: any, index: number) => ({
            url: img.url,
            order: index,
            productId: newProduct.id,
          }))
        })
      }

      // Return product with relations
      return tx.product.findUnique({
        where: { id: newProduct.id },
        include: {
          category: true,
          collection: true,
          images: {
            orderBy: { order: 'asc' }
          }
        },
      })
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
