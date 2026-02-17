'use client'

import { Plus } from 'lucide-react'
import { Product } from '@/data/products'
import Image from 'next/image'

interface ProductGridProps {
  products: Product[]
  onAddToCart: (productId: number) => void
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div>
      {/* Category Navigation */}
      <div className="flex flex-wrap gap-4 md:gap-6 mb-8 pb-4 border-b border-gray-100">
        <button className="text-lg md:text-xl font-bold text-gray-900">
          Серьги<sup className="text-xs ml-1">12</sup>
        </button>
        <button className="text-lg md:text-xl font-bold text-gray-400 hover:text-gray-900 transition-colors">
          Кольца<sup className="text-xs ml-1">8</sup>
        </button>
        <button className="text-lg md:text-xl font-bold text-gray-400 hover:text-gray-900 transition-colors">
          Ожерелья<sup className="text-xs ml-1">5</sup>
        </button>
        <button className="text-lg md:text-xl font-bold text-gray-400 hover:text-gray-900 transition-colors">
          Браслеты<sup className="text-xs ml-1">3</sup>
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {/* Product Image */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <div className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                {product.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-lg md:text-xl font-semibold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                <button
                  onClick={() => onAddToCart(product.id)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#3D2B57] hover:text-white flex items-center justify-center transition-colors duration-200 group/btn"
                  aria-label={`Добавить ${product.name} в корзину`}
                >
                  <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      {products.length > 0 && (
        <div className="flex justify-center gap-2 mt-8 pt-6">
          {[1, 2, 3].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full ${
                dot === 1 ? 'bg-gray-900' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
