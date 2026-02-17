'use client'

import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Product } from '@/lib/api'

interface BestsellersBlockProps {
  products: Product[]
  onAddToCart?: (productId: number) => void
}

const PROMO_TEXT = 'Always out of order — hurry up'
const SHOP_ALL_LABEL = 'Shop all'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function BestsellersBlock({ products, onAddToCart }: BestsellersBlockProps) {
  // Use first 6 products for the grid (2 rows × 4 cols, 2 cells are text)
  const validProducts = products.filter(p => p && p.id && p.name)
  const gridProducts = validProducts.slice(0, 6)
  
  const gridItems: Array<
    | { type: 'product'; product: Product }
    | { type: 'promo'; text: string }
    | { type: 'shopAll'; text: string }
  > = [
    gridProducts[0] ? { type: 'product' as const, product: gridProducts[0] } : { type: 'promo' as const, text: PROMO_TEXT },
    { type: 'promo' as const, text: PROMO_TEXT },
    gridProducts[1] ? { type: 'product' as const, product: gridProducts[1] } : { type: 'promo' as const, text: PROMO_TEXT },
    gridProducts[2] ? { type: 'product' as const, product: gridProducts[2] } : { type: 'promo' as const, text: PROMO_TEXT },
    gridProducts[3] ? { type: 'product' as const, product: gridProducts[3] } : { type: 'promo' as const, text: PROMO_TEXT },
    gridProducts[4] ? { type: 'product' as const, product: gridProducts[4] } : { type: 'promo' as const, text: PROMO_TEXT },
    { type: 'shopAll' as const, text: SHOP_ALL_LABEL },
    gridProducts[5] ? { type: 'product' as const, product: gridProducts[5] } : { type: 'promo' as const, text: PROMO_TEXT },
  ].filter((item): item is { type: 'product'; product: Product } | { type: 'promo'; text: string } | { type: 'shopAll'; text: string } => {
    // Remove product items with invalid products
    if (item.type === 'product') {
      return !!(item.product && item.product.id)
    }
    return true
  })

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            Bestsellers
          </h2>
          <Link
            href="/category/rings"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors uppercase tracking-wide"
          >
            See all
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {gridItems.map((item, index) => {
            if (item.type === 'product') {
              const product = item.product
              if (!product || !product.id) {
                return null
              }
              return (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                    <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = '/products/1.jpg' // Fallback to first product image
                        }}
                      />
                    </div>
                    <div className="p-4 md:p-5">
                      <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-base md:text-lg font-semibold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {onAddToCart && (
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              onAddToCart(product.id)
                            }}
                            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-[#3D2B57] hover:text-white flex items-center justify-center transition-colors duration-200 group/btn"
                            aria-label={`Add ${product.name} to cart`}
                          >
                            <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform duration-200" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            }
            if (item.type === 'promo') {
              return (
                <div
                  key={`promo-${index}`}
                  className="flex items-center justify-center min-h-[200px] md:min-h-[240px] lg:min-h-[280px] p-6 bg-gray-50 rounded-xl"
                >
                  <p className="text-center text-sm md:text-base font-medium text-gray-600 uppercase tracking-wider">
                    {item.text}
                  </p>
                </div>
              )
            }
            // shopAll
            return (
              <Link
                key={`shop-all-${index}`}
                href="/category/rings"
                className="flex items-center justify-center min-h-[200px] md:min-h-[240px] lg:min-h-[280px] p-6 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors duration-200"
              >
                <span className="text-sm md:text-base font-semibold text-gray-900 uppercase tracking-wider">
                  {item.text}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
