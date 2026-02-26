import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface ProductUpdate {
  name: string
  description: string
  collection: string
  price: number
}

// Функция для конвертации имени коллекции в slug
function collectionNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Убираем диакритические знаки
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  // Читаем JSON файл
  const jsonPath = path.join(process.cwd(), 'products_update.json')
  const products: ProductUpdate[] = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

  console.log(`Загружено ${products.length} товаров для обновления`)

  // Получаем все существующие товары из базы
  const existingProducts = await prisma.product.findMany({
    include: { collection: true }
  })

  console.log(`В базе найдено ${existingProducts.length} товаров`)

  let updated = 0
  let created = 0
  let errors = 0

  for (const product of products) {
    try {
      // Ищем существующий товар по имени
      const existing = existingProducts.find(p => 
        p.name.toLowerCase().trim() === product.name.toLowerCase().trim()
      )

      // Находим коллекцию по slug
      let collectionId: string | null = null
      if (product.collection) {
        const slug = collectionNameToSlug(product.collection)
        const collection = await prisma.collection.findUnique({
          where: { slug: slug }
        })
        if (collection) {
          collectionId = collection.id
        } else {
          console.log(`⚠️ Коллекция не найдена: ${product.collection} (slug: ${slug})`)
        }
      }

      if (existing) {
        // Обновляем существующий товар
        await prisma.product.update({
          where: { id: existing.id },
          data: {
            price: product.price,
            description: product.description,
            ...(collectionId && { collectionId })
          }
        })
        console.log(`✅ Обновлен: ${product.name} - $${product.price}`)
        updated++
      } else {
        // Создаём новый товар
        // Находим категорию по умолчанию (Rings)
        const defaultCategory = await prisma.category.findFirst({
          where: { slug: 'rings' }
        })
        
        if (!defaultCategory) {
          console.log(`❌ Не найдена категория для: ${product.name}`)
          errors++
          continue
        }

        // Определяем категорию по названию товара
        let categoryId = defaultCategory.id
        const nameLower = product.name.toLowerCase()
        
        if (nameLower.includes('earring')) {
          const cat = await prisma.category.findFirst({ where: { slug: 'earrings' } })
          if (cat) categoryId = cat.id
        } else if (nameLower.includes('necklace') || nameLower.includes('choker') || nameLower.includes('pendant')) {
          const cat = await prisma.category.findFirst({ where: { slug: 'necklaces-pendants' } })
          if (cat) categoryId = cat.id
        } else if (nameLower.includes('bracelet') || nameLower.includes('talisman')) {
          const cat = await prisma.category.findFirst({ where: { slug: 'bracelets' } })
          if (cat) categoryId = cat.id
        } else if (nameLower.includes('ring')) {
          const cat = await prisma.category.findFirst({ where: { slug: 'rings' } })
          if (cat) categoryId = cat.id
        }

        // Определяем материал из описания
        let material = '18K Gold'
        const desc = product.description.toLowerCase()
        if (desc.includes('diamond')) material = 'Diamond, Gold'
        else if (desc.includes('sapphire')) material = 'Sapphire, Gold'
        else if (desc.includes('ruby')) material = 'Ruby, Gold'
        else if (desc.includes('emerald')) material = 'Emerald, Gold'
        else if (desc.includes('tanzanite')) material = 'Tanzanite, Gold'
        else if (desc.includes('tourmaline')) material = 'Tourmaline, Gold'
        else if (desc.includes('spinel')) material = 'Spinel, Gold'
        else if (desc.includes('amethyst')) material = 'Amethyst, Gold'
        else if (desc.includes('aquamarine')) material = 'Aquamarine, Gold'
        else if (desc.includes('pearl')) material = 'Pearl, Gold'
        else if (desc.includes('garnet')) material = 'Garnet, Gold'

        // Генерируем slug из имени
        const slug = product.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')

        // Путь к изображению (placeholder)
        const image = `/products/${slug}.jpg`

        await prisma.product.create({
          data: {
            name: product.name,
            price: product.price,
            description: product.description,
            material: material,
            image: image,
            categoryId: categoryId,
            collectionId: collectionId,
            isActive: true
          }
        })
        console.log(`➕ Создан: ${product.name} - $${product.price}`)
        created++
      }
    } catch (error) {
      console.error(`❌ Ошибка с ${product.name}:`, error)
      errors++
    }
  }

  console.log('\n=== РЕЗУЛЬТАТ ===')
  console.log(`Обновлено: ${updated}`)
  console.log(`Создано: ${created}`)
  console.log(`Ошибок: ${errors}`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
