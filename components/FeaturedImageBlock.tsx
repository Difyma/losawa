'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FeaturedImageBlock() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Link
            href="/collections"
            className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="/APR01423.JPG"
                alt="Losawa fine jewelry collection"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Fine Jewelry
              </h3>
              <p className="text-white/80 text-sm md:text-base mb-4 line-clamp-2">
                Discover our handcrafted pieces, each telling a unique story of elegance
              </p>
              <div className="flex items-center text-white font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Explore Collection</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
