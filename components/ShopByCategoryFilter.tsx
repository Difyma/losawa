'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, ArrowRight } from 'lucide-react'
import { Product } from '@/data/products'

const ITEMS_PER_CATEGORY = 6

type CategorySlug = 'all' | 'rings' | 'earrings' | 'necklaces' | 'bracelets'

const CATEGORIES: { slug: CategorySlug; label: string }[] = [
  { slug: 'all', label: 'All' },
  { slug: 'rings', label: 'Rings' },
  { slug: 'earrings', label: 'Earrings' },
  { slug: 'necklaces', label: 'Necklaces' },
  { slug: 'bracelets', label: 'Bracelets' },
]

interface ShopByCategoryFilterProps {
  products: Product[]
  onAddToCart: (productId: number) => void
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ShopByCategoryFilter({ products, onAddToCart }: ShopByCategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<CategorySlug>('all')

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  const displayedProducts = filteredProducts.slice(0, ITEMS_PER_CATEGORY)
  const hasMore = filteredProducts.length > ITEMS_PER_CATEGORY
  const moreHref =
    activeCategory === 'all' ? '/shop' : `/category/${activeCategory}`

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-10 text-center">
          Shop by Category
        </h2>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12">
          {CATEGORIES.map(({ slug, label }) => (
            <button
              key={slug}
              type="button"
              onClick={() => setActiveCategory(slug)}
              className={`px-5 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base font-medium transition-colors ${
                activeCategory === slug
                  ? 'bg-[#3D2B57] text-white'
                  : 'bg-[#3D2B57]/10 text-[#3D2B57] hover:bg-[#3D2B57]/20 border border-[#3D2B57]/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayedProducts.map((product) => (
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

          {/* More block — link to full category page */}
          {displayedProducts.length > 0 && (
            <Link
              href={moreHref}
              className="group relative flex flex-col items-center justify-center min-h-[280px] md:min-h-[320px] rounded-xl border-2 border-dashed border-[#3D2B57] hover:bg-[#3D2B57] transition-all duration-200"
            >
              <span className="text-lg md:text-xl font-semibold text-[#3D2B57] group-hover:text-white mb-2 transition-colors">
                More
              </span>
              <span className="text-sm text-gray-500 group-hover:text-white/90 transition-colors">
                View all {activeCategory === 'all' ? 'products' : activeCategory}
              </span>
              <ArrowRight className="w-5 h-5 mt-2 text-[#3D2B57] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          )}
        </div>

        {displayedProducts.length === 0 && (
          <p className="text-center text-gray-500 py-12">No products in this category.</p>
        )}
      </div>
    </section>
  )
}
