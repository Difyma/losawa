'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { products, Product } from '@/data/products'

interface Category {
  id: string
  name: string
  slug: string
}

const categories: Category[] = [
  { id: 'all', name: 'All', slug: '' },
  { id: 'rings', name: 'Rings', slug: 'rings' },
  { id: 'earrings', name: 'Earrings', slug: 'earrings' },
  { id: 'necklaces', name: 'Necklaces', slug: 'necklaces' },
  { id: 'bracelets', name: 'Bracelets', slug: 'bracelets' },
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function CategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const itemsPerView = 3

  const filteredProducts = selectedCategory === 'all' 
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev >= filteredProducts.length - itemsPerView ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev <= 0 ? Math.max(0, filteredProducts.length - itemsPerView) : prev - 1
    )
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentIndex(0)
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
          Shop by Category
        </h2>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            category.id === 'all' ? (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ) : (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {category.name}
              </Link>
            )
          ))}
        </div>
        
        <div className="relative">
          {/* Navigation Buttons */}
          {filteredProducts.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden md:flex items-center justify-center"
                aria-label="Previous products"
              >
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden md:flex items-center justify-center"
                aria-label="Next products"
              >
                <ChevronRight className="w-6 h-6 text-gray-900" />
              </button>
            </>
          )}

          {/* Products Slider */}
          {filteredProducts.length > 0 ? (
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / itemsPerView}%` }}
                  >
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#3D2B57] hover:text-white flex items-center justify-center transition-colors duration-200 opacity-0 group-hover:opacity-100"
                            aria-label={`Add ${product.name} to cart`}
                            onClick={(e) => e.preventDefault()}
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                            {product.category}
                          </p>
                          <h3 className="text-base font-medium text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-lg font-semibold text-gray-900">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-12">
              No products found in this category
            </p>
          )}

          {/* Mobile Navigation Dots */}
          {filteredProducts.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-6 md:hidden">
              {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerView) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * itemsPerView)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    Math.floor(currentIndex / itemsPerView) === index
                      ? 'bg-gray-900 w-8'
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
