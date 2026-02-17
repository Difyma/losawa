/**
 * Alternative seed script that uses direct SQLite access
 * Run with: npx tsx scripts/seed-db.ts
 */

import Database from 'better-sqlite3'
import { products } from '../data/products'
import { collections } from '../data/collections'

// Use the same path as Prisma config
const dbPath = process.env.DATABASE_URL?.replace('file:', '') || './prisma/dev.db'
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

try {
  db.exec('BEGIN TRANSACTION')

  // Clear existing data (only if tables exist)
  const tables = ['OrderItem', 'Order', 'Product', 'Collection', 'Category']
  for (const table of tables) {
    try {
      db.exec(`DELETE FROM ${table}`)
    } catch (e) {
      // Table doesn't exist, skip
    }
  }

  // Insert Categories
  const categories = [
    { slug: 'rings', name: 'Rings' },
    { slug: 'earrings', name: 'Earrings' },
    { slug: 'necklaces', name: 'Necklaces & Pendants' },
    { slug: 'bracelets', name: 'Bracelets' },
    { slug: 'engagement', name: 'Love & Engagement' },
    { slug: 'watches', name: 'Watches' },
  ]

  const insertCategory = db.prepare('INSERT INTO Category (id, slug, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)')
  const categoryMap: Record<string, string> = {}

  for (const cat of categories) {
    const id = `cat_${cat.slug}`
    categoryMap[cat.slug] = id
    const now = new Date().toISOString()
    insertCategory.run(id, cat.slug, cat.name, now, now)
  }

  console.log('✅ Categories created')

  // Insert Collections
  const collectionMap: Record<string, string> = {
    'Cleopatra': 'cleopatra',
    'Jacqueline': 'jacqueline',
    'Eclat': 'eclat',
    'Éclat': 'eclat',
    'Embrace': 'embrace',
  }

  const insertCollection = db.prepare(`
    INSERT INTO Collection (id, slug, name, description, image, subtitle, quote, fullDescription, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const collectionIdMap: Record<string, string> = {}

  for (const col of collections) {
    const id = `col_${col.id}`
    collectionIdMap[col.id] = id
    const now = new Date().toISOString()
    insertCollection.run(
      id,
      col.id, // slug
      col.name,
      col.description,
      col.image,
      col.subtitle || null,
      col.quote || null,
      col.fullDescription || null,
      now,
      now
    )
  }

  console.log('✅ Collections created')

  // Insert Products
  const insertProduct = db.prepare(`
    INSERT INTO Product (name, price, image, material, description, dateAdded, createdAt, updatedAt, categoryId, collectionId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  let productCount = 0
  for (const product of products) {
    // Determine collection from product name
    let collectionId: string | null = null
    for (const [name, slug] of Object.entries(collectionMap)) {
      if (product.name.startsWith(name)) {
        collectionId = collectionIdMap[slug] || null
        break
      }
    }

    // Get category ID
    const categorySlug = product.category
    const categoryId = categoryMap[categorySlug]

    if (!categoryId) {
      console.warn(`⚠️  Category not found for product: ${product.name} (category: ${product.category})`)
      continue
    }

    const now = new Date().toISOString()
    insertProduct.run(
      product.name,
      product.price,
      product.image,
      product.material,
      product.description || null,
      product.dateAdded,
      now,
      now,
      categoryId,
      collectionId
    )
    productCount++
  }

  console.log(`✅ ${productCount} products created`)

  db.exec('COMMIT')
  console.log('🎉 Database seeded successfully!')
} catch (error) {
  db.exec('ROLLBACK')
  console.error('❌ Error seeding database:', error)
  throw error
} finally {
  db.close()
}
