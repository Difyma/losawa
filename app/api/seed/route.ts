import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const categories = [
  { slug: 'rings', name: 'Rings' },
  { slug: 'earrings', name: 'Earrings' },
  { slug: 'necklaces', name: 'Necklaces & Pendants' },
  { slug: 'bracelets', name: 'Bracelets' },
  { slug: 'engagement', name: 'Love & Engagement' },
  { slug: 'watches', name: 'Watches' },
]

const collections = [
  {
    slug: 'cleopatra',
    name: 'Cleopatra',
    description: 'Inspired by the legendary Egyptian queen',
    image: '/collections/cleopatra.jpg',
    subtitle: 'Royal Elegance',
    quote: 'Beauty that transcends time',
    fullDescription: 'A collection inspired by the legendary Egyptian queen, featuring bold designs and luxurious materials.',
  },
  {
    slug: 'jacqueline',
    name: 'Jacqueline',
    description: 'Timeless elegance inspired by Jackie Kennedy',
    image: '/collections/jacqueline.jpg',
    subtitle: 'Classic Sophistication',
    quote: 'Elegance is the only beauty that never fades',
    fullDescription: 'Timeless pieces inspired by the iconic style of Jackie Kennedy.',
  },
  {
    slug: 'eclat',
    name: 'Éclat',
    description: 'Radiant brilliance in every piece',
    image: '/collections/eclat.jpg',
    subtitle: 'Radiant Brilliance',
    quote: 'Shine with inner light',
    fullDescription: 'Pieces designed to capture and reflect light beautifully.',
  },
  {
    slug: 'embrace',
    name: 'Embrace',
    description: 'Warm, embracing designs for everyday wear',
    image: '/collections/embrace.jpg',
    subtitle: 'Warm Embrace',
    quote: 'Jewelry that hugs your soul',
    fullDescription: 'Comfortable, wearable pieces perfect for everyday elegance.',
  },
]

const products = [
  { name: 'Cleopatra Gold Ring', price: 1250, image: '/products/ring1.jpg', material: '18K Gold', category: 'rings' },
  { name: 'Jacqueline Diamond Ring', price: 2800, image: '/products/ring2.jpg', material: 'Platinum, Diamond', category: 'rings' },
  { name: 'Éclat Sapphire Ring', price: 1850, image: '/products/ring3.jpg', material: 'White Gold, Sapphire', category: 'rings' },
  { name: 'Cleopatra Drop Earrings', price: 950, image: '/products/earring1.jpg', material: '18K Gold', category: 'earrings' },
  { name: 'Jacqueline Pearl Earrings', price: 750, image: '/products/earring2.jpg', material: 'Pearl, Gold', category: 'earrings' },
  { name: 'Éclat Diamond Studs', price: 1200, image: '/products/earring3.jpg', material: 'Diamond, Platinum', category: 'earrings' },
  { name: 'Cleopatra Pendant Necklace', price: 1450, image: '/products/necklace1.jpg', material: '18K Gold, Emerald', category: 'necklaces' },
  { name: 'Jacqueline Pearl Necklace', price: 2200, image: '/products/necklace2.jpg', material: 'Pearl, Gold', category: 'necklaces' },
  { name: 'Éclat Diamond Necklace', price: 3500, image: '/products/necklace3.jpg', material: 'Diamond, Platinum', category: 'necklaces' },
  { name: 'Cleopatra Cuff Bracelet', price: 1800, image: '/products/bracelet1.jpg', material: '18K Gold', category: 'bracelets' },
  { name: 'Jacqueline Chain Bracelet', price: 650, image: '/products/bracelet2.jpg', material: 'Gold', category: 'bracelets' },
  { name: 'Éclat Tennis Bracelet', price: 4200, image: '/products/bracelet3.jpg', material: 'Diamond, White Gold', category: 'bracelets' },
]

export async function POST() {
  try {
    console.log('🌱 Starting database seed...')

    // Clear existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.collection.deleteMany()
    await prisma.category.deleteMany()
    console.log('🗑️  Cleared existing data')

    // Create categories
    const categoryMap: Record<string, string> = {}
    for (const cat of categories) {
      const created = await prisma.category.create({ data: cat })
      categoryMap[cat.slug] = created.id
      console.log(`✅ Created category: ${cat.name}`)
    }

    // Create collections
    const collectionMap: Record<string, string> = {}
    for (const col of collections) {
      const created = await prisma.collection.create({ data: col })
      collectionMap[col.slug] = created.id
      console.log(`✅ Created collection: ${col.name}`)
    }

    // Create products
    let productCount = 0
    for (const product of products) {
      let collectionId: string | null = null
      if (product.name.startsWith('Cleopatra')) collectionId = collectionMap['cleopatra']
      else if (product.name.startsWith('Jacqueline')) collectionId = collectionMap['jacqueline']
      else if (product.name.startsWith('Éclat')) collectionId = collectionMap['eclat']

      const categoryId = categoryMap[product.category]

      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          image: product.image,
          material: product.material,
          description: `Beautiful ${product.name.toLowerCase()} crafted from ${product.material}`,
          categoryId: categoryId,
          collectionId: collectionId,
          isActive: true,
        },
      })
      productCount++
    }
    console.log(`✅ Created ${productCount} products`)

    return NextResponse.json({
      success: true,
      message: '🎉 Database seed completed!',
      stats: {
        categories: categories.length,
        collections: collections.length,
        products: productCount,
      }
    })
  } catch (error: any) {
    console.error('❌ Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database', details: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Use POST request to seed database',
    endpoint: '/api/seed',
    method: 'POST',
  })
}
