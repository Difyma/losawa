import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Новые данные из файла
const productsData = [
  { name: 'Cleopatra Green Sapphire Ring', description: 'Egyptian-inspired ring with green sapphire and diamonds', collection: 'Cleopatra', price: 4000 },
  { name: 'Cleopatra Pink Sapphire Ring', description: 'Egyptian-inspired ring with pink sapphire and diamonds', collection: 'Cleopatra', price: 4000 },
  { name: 'Cleopatra Tanzanite Ring', description: 'Blue tanzanite ring with handmade diamond shank', collection: 'Cleopatra', price: 5200 },
  { name: 'Ambition Ring', description: 'Pear-shaped yellow diamond with black enamel design', collection: 'Cleopatra', price: 3500 },
  { name: 'Cleopatra Sapphire Earrings', description: 'Yellow and purple sapphire earrings with diamonds', collection: 'Cleopatra', price: 4500 },
  { name: 'Ra Red Spinel Earrings', description: 'Hoop earrings with Mahenge red spinel', collection: 'Cleopatra', price: 1600 },
  { name: 'Selene Tourmaline Earrings', description: 'Multicolored tourmalines with pink sapphire halo', collection: 'Cleopatra', price: 2300 },
  { name: 'Cleo Amethyst Talisman', description: 'Amethyst talisman with rose-cut diamonds', collection: 'Cleopatra', price: 4300 },
  { name: 'Cleo Amethyst Talisman', description: 'Amethyst talisman with rose-cut diamonds', collection: 'Cleopatra', price: 5500 },
  { name: 'Enigma Sapphire Choker', description: 'Multicolored sapphire necklace', collection: 'Cleopatra', price: 21000 },
  { name: 'Iris Earrings', description: 'Yellow sapphire and green tourmaline earrings', collection: 'Cleopatra', price: 2400 },
  { name: 'Iris Pendant', description: 'Yellow sapphire and tourmaline pendant', collection: 'Cleopatra', price: 1800 },
  { name: 'Kaleidoscope Necklace', description: 'Fancy colored sapphires with rose-cut diamonds', collection: 'Cleopatra', price: 16000 },
  { name: 'Jacqueline Ring Amethyst Turquoise', description: 'Amethyst and turquoise statement ring', collection: 'Jacqueline', price: 4000 },
  { name: 'Jacqueline Ring Amethyst White Agate', description: 'Amethyst and white agate ring', collection: 'Jacqueline', price: 4200 },
  { name: 'Lumina Ring', description: 'Pearl ring with diamonds in white gold', collection: 'Jacqueline', price: 1400 },
  { name: 'Jacqueline Earrings', description: 'Amethyst and turquoise earrings', collection: 'Jacqueline', price: 4200 },
  { name: 'Jacqueline Pearl Necklace Peach Tourmaline', description: 'Pearl necklace with peach tourmaline', collection: 'Jacqueline', price: 1200 },
  { name: 'Jacqueline Pearl Necklace Pastel Spinels', description: 'Pearl necklace with pastel spinels', collection: 'Jacqueline', price: 1400 },
  { name: 'Jacqueline Pearl Necklace Pastel Spinels 2', description: 'Pearl necklace with pastel spinels', collection: 'Jacqueline', price: 1400 },
  { name: 'Jacqueline Amethyst Pendant', description: 'Amethyst and turquoise pendant', collection: 'Jacqueline', price: 2000 },
  { name: 'Éclat Tanzanite Ring', description: 'Tanzanite ring with green tsavorites', collection: 'Éclat', price: 7000 },
  { name: 'Verve Aquamarine Ring', description: 'Aquamarine ring with diamonds', collection: 'Éclat', price: 10000 },
  { name: 'Wish Blue Tourmaline Ring', description: 'Blue tourmaline ring with diamonds', collection: 'Éclat', price: 2800 },
  { name: 'Fly Ring', description: 'Blue enamel feather ring with diamonds', collection: 'Éclat', price: 1400 },
  { name: 'Fly Pendant', description: 'Blue enamel feather pendant', collection: 'Éclat', price: 1600 },
  { name: 'Fly Earrings', description: 'Blue enamel feather earrings', collection: 'Éclat', price: 2500 },
  { name: 'Peach Tourmaline Earrings', description: 'Peach tourmaline earrings with diamond halo', collection: 'Éclat', price: 2800 },
  { name: 'Éclat Spinel Necklace', description: 'Grey spinel necklace', collection: 'Éclat', price: 11000 },
  { name: 'Temptation Spinel Necklace', description: 'Spinel necklace', collection: 'Éclat', price: 1300 },
  { name: 'Temptation Spinel Necklace 2', description: 'Spinel necklace', collection: 'Éclat', price: 1300 },
  { name: 'Temptation Spinel Necklace 3', description: 'Spinel necklace', collection: 'Éclat', price: 1300 },
  { name: 'Lagoon Tourmaline Ring', description: 'Lagoon tourmaline ring with diamond halo', collection: 'Éclat', price: 3000 },
  { name: 'Embrace Tanzanite Ring', description: 'Trinity ring with tanzanite and diamonds', collection: 'Embrace', price: 5000 },
  { name: 'Embrace Garnet Ring', description: 'Mandarin garnet ring', collection: 'Embrace', price: 6500 },
  { name: 'Embrace Tanzanite Ring Large', description: 'Tanzanite ring with diamonds', collection: 'Embrace', price: 7000 },
  { name: 'Embrace Tanzanite Earrings', description: 'Tanzanite earrings with diamonds', collection: 'Embrace', price: 5000 },
  { name: 'Love Chakra Ruby Bracelet', description: 'Ruby bracelet with chakra symbol', collection: 'Embrace', price: 2000 },
  { name: 'Love Chakra Ruby Bracelet 2', description: 'Ruby bracelet with chakra symbol', collection: 'Embrace', price: 2500 },
  { name: 'Love Chakra Ruby Bracelet 3', description: 'Ruby bracelet with chakra symbol', collection: 'Embrace', price: 2000 },
  { name: 'Love Chakra Ruby Bracelet 4', description: 'Ruby bracelet with chakra symbol', collection: 'Embrace', price: 2000 },
  { name: 'Yalla Bracelet Choker', description: 'Diamond charm bracelet on velvet ribbon', collection: 'Embrace', price: 2500 },
]

// Функция для конвертации имени коллекции в slug
function collectionNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Определяем материал из описания
function getMaterial(description: string, name: string): string {
  const desc = description.toLowerCase()
  const nameLower = name.toLowerCase()
  
  if (desc.includes('white gold')) return '18K White Gold'
  if (desc.includes('yellow gold')) return '18K Yellow Gold'
  if (desc.includes('rose gold')) return '18K Rose Gold'
  
  // По умолчанию для разных коллекций
  if (nameLower.includes('diamond')) return 'Diamond, 18K Gold'
  if (nameLower.includes('sapphire')) return 'Sapphire, 18K Gold'
  if (nameLower.includes('ruby')) return 'Ruby, 18K Gold'
  if (nameLower.includes('emerald')) return 'Emerald, 18K Gold'
  if (nameLower.includes('tanzanite')) return 'Tanzanite, 18K Gold'
  if (nameLower.includes('tourmaline')) return 'Tourmaline, 18K Gold'
  if (nameLower.includes('spinel')) return 'Spinel, 18K Gold'
  if (nameLower.includes('amethyst')) return 'Amethyst, 18K Gold'
  if (nameLower.includes('aquamarine')) return 'Aquamarine, 18K Gold'
  if (nameLower.includes('pearl')) return 'Pearl, 18K Gold'
  if (nameLower.includes('garnet')) return 'Garnet, 18K Gold'
  if (nameLower.includes('turquoise')) return 'Turquoise, 18K Gold'
  if (nameLower.includes('agate')) return 'Agate, 18K Gold'
  
  return '18K Gold'
}

// Определяем категорию по названию
function getCategorySlug(name: string): string {
  const nameLower = name.toLowerCase()
  if (nameLower.includes('earring')) return 'earrings'
  if (nameLower.includes('necklace') || nameLower.includes('choker') || nameLower.includes('pendant')) return 'necklaces'
  if (nameLower.includes('bracelet')) return 'bracelets'
  if (nameLower.includes('talisman')) return 'bracelets'
  if (nameLower.includes('ring')) return 'rings'
  return 'rings'
}

async function main() {
  console.log('=== ОБНОВЛЕНИЕ БАЗЫ ДАННЫХ ===\n')

  // Удаляем все текущие товары
  console.log('Удаление текущих товаров...')
  await prisma.product.deleteMany({})
  console.log('✅ Товары удалены\n')

  // Получаем все коллекции и категории
  const collections = await prisma.collection.findMany()
  const categories = await prisma.category.findMany()
  
  console.log(`Найдено коллекций: ${collections.length}`)
  console.log(`Найдено категорий: ${categories.length}\n`)

  let created = 0
  let errors = 0

  for (const product of productsData) {
    try {
      // Находим коллекцию
      const collectionSlug = collectionNameToSlug(product.collection)
      const collection = collections.find(c => c.slug === collectionSlug)
      
      if (!collection) {
        console.log(`⚠️ Коллекция не найдена: ${product.collection} (slug: ${collectionSlug})`)
      }

      // Находим категорию
      const categorySlug = getCategorySlug(product.name)
      const category = categories.find(c => c.slug === categorySlug)
      
      if (!category) {
        console.log(`❌ Категория не найдена: ${categorySlug} для ${product.name}`)
        errors++
        continue
      }

      // Генерируем slug из имени
      const slug = product.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      // Путь к изображению
      const image = `/products/${slug}.jpg`

      // Определяем материал
      const material = getMaterial(product.description, product.name)

      await prisma.product.create({
        data: {
          name: product.name,
          price: product.price,
          description: product.description,
          material: material,
          image: image,
          categoryId: category.id,
          collectionId: collection?.id || null,
          isActive: true
        }
      })
      console.log(`✅ ${product.name} | $${product.price} | ${product.collection}`)
      created++
    } catch (error) {
      console.error(`❌ Ошибка с ${product.name}:`, error)
      errors++
    }
  }

  console.log('\n=== РЕЗУЛЬТАТ ===')
  console.log(`Создано: ${created}`)
  console.log(`Ошибок: ${errors}`)
  console.log(`Всего товаров в базе: ${created}`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
