'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { collections } from '@/data/collections'

export default function AllCollectionsPage() {
  const [cartItems] = useState<number[]>([])

  return (
    <main className="min-h-screen bg-white">
      <Header cartCount={cartItems.length} />

      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              All Collections
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our exquisite jewelry collections, each telling a unique story of craftsmanship and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collection/${collection.id}`}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {collection.name}
                  </h2>
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
        </div>
      </section>

      <Footer />
    </main>
  )
}
