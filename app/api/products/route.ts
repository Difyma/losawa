import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('API Products called')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const collection = searchParams.get('collection')

    console.log('Query params:', { category, collection })

    const where: any = {
      isActive: true,
    }

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

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        collection: true,
      },
      orderBy: {
        dateAdded: 'desc',
      },
    })

    console.log('Products fetched:', products.length)

    const transformedProducts = products.map((product) => ({
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
  } catch (error: any) {
    console.error('Error fetching products:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch products', 
        details: error.message,
        code: error.code 
      },
      { status: 500 }
    )
  }
}
