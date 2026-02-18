import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const collection = await prisma.collection.findUnique({
      where: { slug: params.slug },
      include: {
        products: {
          include: {
            category: true,
            collection: true,
          },
        },
      },
    })

    if (!collection) {
      return NextResponse.json(
        { error: 'Collection not found' },
        { status: 404 }
      )
    }

    // Transform collection and products to match frontend interface
    const transformedCollection = {
      id: collection.id,
      slug: collection.slug,
      name: collection.name,
      description: collection.description,
      image: collection.image,
      subtitle: collection.subtitle,
      quote: collection.quote,
      fullDescription: collection.fullDescription,
      products: collection.products.map((product: typeof collection.products[0]) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        material: product.material,
        description: product.description,
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
      })),
    }

    return NextResponse.json(transformedCollection)
  } catch (error) {
    console.error('Error fetching collection:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collection' },
      { status: 500 }
    )
  }
}
