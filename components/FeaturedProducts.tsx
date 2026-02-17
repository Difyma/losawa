'use client'

import Link from 'next/link'
import { Product } from '@/data/products'
import { Plus } from 'lucide-react'

interface FeaturedProductsProps {
  products: Product[]
  title: string
  subtitle?: string
  onAddToCart: (productId: number) => void
}

export default function FeaturedProducts({
  products,
  title,
  subtitle,
  onAddToCart,
}: FeaturedProductsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {subtitle && (
          <p className="text-center text-sm md:text-base text-gray-600 mb-4 uppercase tracking-wide">
            {subtitle}
          </p>
        )}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.slice(0, 8).map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg md:text-xl font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        onAddToCart(product.id)
                      }}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#3D2B57] hover:text-white flex items-center justify-center transition-colors duration-200 group/btn"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
