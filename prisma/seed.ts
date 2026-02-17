import 'dotenv/config'
import { products } from '../data/products'
import { prisma } from '../lib/prisma'

// Map collection names to slugs
const collectionMap: Record<string, string> = {
  'Cleopatra': 'cleopatra',
  'Jacqueline': 'jacqueline',
  'Eclat': 'eclat',
  'Éclat': 'eclat',
  'Embrace': 'embrace',
}

// Map category slugs
const categoryMap: Record<string, string> = {
  'rings': 'rings',
  'earrings': 'earrings',
  'necklaces': 'necklaces',
  'bracelets': 'bracelets',
}

async function main() {
  console.log('🌱 Starting seed...')

  // Create Categories
  const categories = [
    { slug: 'rings', name: 'Rings' },
    { slug: 'earrings', name: 'Earrings' },
    { slug: 'necklaces', name: 'Necklaces & Pendants' },
    { slug: 'bracelets', name: 'Bracelets' },
    { slug: 'engagement', name: 'Love & Engagement' },
    { slug: 'watches', name: 'Watches' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log('✅ Categories created')

  // Create Collections
  const collections = [
    {
      slug: 'cleopatra',
      name: 'Cleopatra',
      description: 'Egyptian-inspired designs embodying feminine strength and regal allure',
      image: '/products/1.jpg',
      quote: 'In Egypt\'s land where the Nile winds its way,\nCleopatra danced, in twilight\'s soft array.\nHer beauty, a mystery, veiled in grace,\nA queen whose name time won\'t erase...',
      fullDescription: 'The Cleopatra Collection is a mystical ensemble of fine jewelry that transcends time, drawing inspiration from the enduring allure of ancient Egyptian culture and the legendary queen herself. Whether it\'s a bold statement ring, talisman pendant, or delicate earrings that evoke an air of seduction, every design in the Cleopatra Collection embodies the spirit of this legendary queen, echoing stories of ancient wisdom and mysticism.',
    },
    {
      slug: 'jacqueline',
      name: 'Jacqueline',
      description: 'Vintage 60s glamour with modern luxury and sophisticated charm',
      image: '/products/14.jpg',
      subtitle: 'Timeless Elegance of the 1960s: The Jacqueline Kennedy-Inspired Collection',
      fullDescription: 'Immerse yourself in the allure of the 1960s with our elegant avant-garde creations. This collection pays homage to Jackie\'s charm and style, bringing it to life through a fusion of unconventional design decisions, bold shapes, and daring color palettes. Each piece invites you to celebrate the spirit of this transformative decade, resonating with the energy of change and self-expression. Adorn yourself in the nostalgia of an era that reshaped fashion and let the Jacqueline Collection guide you in expressing timeless elegance with a modern twist.',
    },
    {
      slug: 'eclat',
      name: 'Éclat',
      description: 'Timeless elegance featuring vibrant gemstones and refined craftsmanship',
      image: '/products/22.jpg',
      fullDescription: 'Step into the realm of timeless allure with our Éclat Collection, a symbol of refined style for those seeking the perfect blend of tradition and contemporary flair. This collection accentuates the ethereal aura of cold-palette gemstones, selected for their exceptional brilliance and distinctive charm. Evoking the celestial essence of beauty. Elegance and modernity meet in each piece, tailored to confident women who appreciate bold sophistication.',
    },
    {
      slug: 'embrace',
      name: 'Embrace',
      description: 'Sophisticated designs celebrating love and connection with exquisite gemstones',
      image: '/products/34.jpg',
      fullDescription: 'The Embrace Collection, infused with sincerity, is inspired by the profound journey to self-love, appreciation, and inner strength. Rooted in the principles of self-love and acceptance, each meticulously crafted piece is a tangible expression of the wearer\'s voyage of self-discovery. This collection redefines traditional jewelry into a wearable celebration of inner worth, offering symbolic designs. From the intricate "Yalla" bracelets, symbolizing personal growth and confidence, to the elegantly crafted rings and earrings that lovingly "embrace" you, each piece in this collection speaks of enduring love and personal empowerment.',
    },
  ]

  for (const col of collections) {
    await prisma.collection.upsert({
      where: { slug: col.slug },
      update: {},
      create: col,
    })
  }
  console.log('✅ Collections created')

  // Get all categories and collections
  const categoryRecords = await prisma.category.findMany()
  const collectionRecords = await prisma.collection.findMany()

  const categoryMapById: Record<string, string> = {}
  for (const cat of categoryRecords) {
    categoryMapById[cat.slug] = cat.id
  }

  const collectionMapById: Record<string, string> = {}
  for (const col of collectionRecords) {
    collectionMapById[col.slug] = col.id
  }

  // Create Products from existing data
  console.log(`📦 Creating ${products.length} products...`)
  
  for (const product of products) {
    // Determine collection from product name
    let collectionId: string | undefined = undefined
    for (const [name, slug] of Object.entries(collectionMap)) {
      if (product.name.startsWith(name)) {
        collectionId = collectionMapById[slug]
        break
      }
    }

    // Get category ID
    const categorySlug = categoryMap[product.category] || product.category
    const categoryId = categoryMapById[categorySlug]

    if (!categoryId) {
      console.warn(`⚠️  Category not found for product: ${product.name} (category: ${product.category})`)
      continue
    }

    // Check if product already exists (by name)
    const existing = await prisma.product.findFirst({
      where: {
        name: product.name,
      },
    })

    if (existing) {
      // Update existing product
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          price: product.price,
          image: product.image,
          material: product.material,
          description: product.description,
          categoryId,
          collectionId,
          dateAdded: new Date(product.dateAdded),
        },
      })
    } else {
      // Create new product
      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          image: product.image,
          material: product.material,
          description: product.description,
          categoryId,
          collectionId,
          dateAdded: new Date(product.dateAdded),
        },
      })
    }
  }

  console.log('✅ Products created/updated')
  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
