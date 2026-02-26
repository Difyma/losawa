import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        category: true,
        collection: true,
        images: {
          orderBy: { order: 'asc' }
        }
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Build images array: main image + additional images
    const images = [product.image]
    if (product.images && product.images.length > 0) {
      images.push(...product.images.map(img => img.url))
    }

    // Transform product to match frontend interface
    const transformedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      images: images,
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
    }

    return NextResponse.json(transformedProduct)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
