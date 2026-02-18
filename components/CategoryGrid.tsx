'use client'

import { ChevronRight } from 'lucide-react'

import Link from 'next/link'

interface Category {
  name: string
  image: string
  slug: string
  count: number
}

const categories: Category[] = [
  {
    name: 'Necklaces & Pendants',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
    slug: 'necklaces',
    count: 11514,
  },
  {
    name: 'Rings',
    image: '/categories/rings.jpg',
    slug: 'rings',
    count: 58884,
  },
  {
    name: 'Earrings',
    image: '/categories/rings.jpg',
    slug: 'earrings',
    count: 7550,
  },
  {
    name: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop',
    slug: 'bracelets',
    count: 1402,
  },
  {
    name: 'Love & Engagement',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
    slug: 'engagement',
    count: 57045,
  },
  {
    name: 'Watches',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=400&fit=crop',
    slug: 'watches',
    count: 154,
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-xl bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/categories/rings.jpg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-4">
                  {category.count.toLocaleString('en-US')} products
                </p>
                <div className="flex items-center text-white group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-medium">Shop</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
