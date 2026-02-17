'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Collection {
  id: string
  name: string
  description: string
  image: string
}

const collections: Collection[] = [
  {
    id: 'cleopatra',
    name: 'Cleopatra',
    description: 'Egyptian-inspired designs embodying feminine strength and regal allure',
    image: '/products/1.jpg',
  },
  {
    id: 'jacqueline',
    name: 'Jacqueline',
    description: 'Vintage 60s glamour with modern luxury and sophisticated charm',
    image: '/products/14.jpg',
  },
  {
    id: 'eclat',
    name: 'Éclat',
    description: 'Timeless elegance featuring vibrant gemstones and refined craftsmanship',
    image: '/products/22.jpg',
  },
]

export default function Collections() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Collections
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our exquisite jewelry collections, each telling a unique story of craftsmanship and elegance
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collection/${collection.id}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {collection.name}
                </h3>
                <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
                  {collection.description}
                </p>
                <div className="flex items-center text-white font-medium group-hover:translate-x-2 transition-transform duration-300">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/collections"
            className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-colors duration-200"
          >
            View All Collections
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
