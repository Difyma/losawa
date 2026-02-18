'use client'

import { ChevronRight } from 'lucide-react'

interface GiftOption {
  title: string
  image: string
  link: string
}

const giftOptions: GiftOption[] = [
  {
    title: 'Heart-shaped Jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop',
    link: '#',
  },
  {
    title: 'Most Popular Jewelry',
    image: '/categories/rings.jpg',
    link: '#',
  },
  {
    title: 'Gifts for Her',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop',
    link: '#',
  },
]

export default function PerfectGift() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
          Find the Perfect Gift
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {giftOptions.map((option, index) => (
            <a
              key={index}
              href={option.link}
              className="group relative overflow-hidden rounded-xl bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
                <img
                  src={option.image}
                  alt={option.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/categories/rings.jpg'
                  }}
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                  {option.title}
                </h3>
                <div className="flex items-center text-gray-900 group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-sm font-medium">Shop</span>
                  <ChevronRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
