'use client'

import { ChevronRight } from 'lucide-react'

export default function ArtOfGifting() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
            The Art of Gifting
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed">
            Celebrate every facet of the ones you love with meaningful designs this special day.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm md:text-base"
          >
            Explore the Gift Guide
            <ChevronRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </div>
    </section>
  )
}
