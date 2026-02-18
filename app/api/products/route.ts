import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Log for debugging
    console.log('DATABASE_URL:', process.env.DATABASE_URL)
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const collection = searchParams.get('collection')
    const material = searchParams.get('material')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    const where: any = {}

    if (category) {
      const categoryRecord = await prisma.category.findUnique({
        where: { slug: category },
      })
      if (categoryRecord) {
        where.categoryId = categoryRecord.id
      }
    }

    if (collection) {
      const collectionRecord = await prisma.collection.findUnique({
        where: { slug: collection },
      })
      if (collectionRecord) {
        where.collectionId = collectionRecord.id
      }
    }

    if (material) {
      where.material = {
        contains: material,
        mode: 'insensitive',
      }
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    const products = await prisma.product.findMany({
      where: {
        ...where,
        isActive: true, // Only show active products on frontend
      },
      include: {
        category: true,
        collection: true,
      },
      orderBy: {
        dateAdded: 'desc',
      },
    })

    // Transform products to match frontend interface
    type ProductWithRelations = (typeof products)[number]

    const transformedProducts = products
      .filter((product: ProductWithRelations) => product && product.id && product.category)
      .map((product: ProductWithRelations) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        material: product.material,
        description: product.description || undefined,
        dateAdded: product.dateAdded.toISOString(),
        category: {
          id: product.category.id,
          slug: product.category.slug,
          name: product.category.name,
        },
        collection: product.collection
          ? {
              id: product.collection.id,
              slug: product.collection.slug,
              name: product.collection.name,
            }
          : undefined,
      }))

    return NextResponse.json(transformedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Full error:', errorMessage)
    return NextResponse.json(
      { error: 'Failed to fetch products', details: errorMessage },
      { status: 500 }
    )
  }
}
