import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// GET - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()

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

    return NextResponse.json(product)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      isActive,
      additionalImages,
    } = body

    // Update product basic info
    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        ...(name && { name }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(image && { image }),
        ...(material && { material }),
        ...(description !== undefined && { description }),
        ...(categoryId && { categoryId }),
        ...(collectionId !== undefined && { collectionId: collectionId || null }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    // Update additional images if provided
    if (additionalImages !== undefined) {
      // Delete existing images
      await prisma.productImage.deleteMany({
        where: { productId: parseInt(params.id) }
      })

      // Create new images
      if (additionalImages.length > 0) {
        await prisma.productImage.createMany({
          data: additionalImages.map((img: any, index: number) => ({
            url: img.url,
            order: index,
            productId: parseInt(params.id),
          }))
        })
      }
    }

    // Return updated product with images
    const updatedProduct = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        category: true,
        collection: true,
        images: {
          orderBy: { order: 'asc' }
        }
      },
    })

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin()

    await prisma.product.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}
