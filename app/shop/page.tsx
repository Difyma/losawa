'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ChevronRight, Plus, SlidersHorizontal, X } from 'lucide-react'
import { products } from '@/data/products'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const materials = ['All', 'Yellow Gold', 'White Gold', 'Rose Gold', 'Silver']
const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under $5,000', min: 0, max: 5000 },
  { label: '$5,000 - $10,000', min: 5000, max: 10000 },
  { label: '$10,000 - $20,000', min: 10000, max: 20000 },
  { label: 'Over $20,000', min: 20000, max: Infinity },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)

export default function ShopPage() {
  const [cartItems, setCartItems] = useState<number[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState('featured')

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (selectedMaterial !== 'All') {
      result = result.filter((p) =>
        p.material.toLowerCase().includes(selectedMaterial.toLowerCase())
      )
    }

    result = result.filter(
      (p) =>
        p.price >= selectedPriceRange.min && p.price <= selectedPriceRange.max
    )

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result = [...result].sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        )
        break
    }

    return result
  }, [selectedMaterial, selectedPriceRange, sortBy])

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId])
  }

  const clearFilters = () => {
    setSelectedMaterial('All')
    setSelectedPriceRange(priceRanges[0])
  }

  const activeFiltersCount =
    (selectedMaterial !== 'All' ? 1 : 0) +
    (selectedPriceRange.label !== 'All' ? 1 : 0)

  return (
    <main className="min-h-screen bg-white">
      <Header cartCount={cartItems.length} />

      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">All Products</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          All Products
        </h1>
        <p className="text-gray-600 max-w-2xl mb-8">
          Explore our full collection of handcrafted jewelry.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            <span className="text-gray-500">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'product' : 'products'}
            </span>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-900 underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Filters</h3>

              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Material
                </h4>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label
                      key={material}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="material"
                        checked={selectedMaterial === material}
                        onChange={() => setSelectedMaterial(material)}
                        className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span
                        className={`ml-3 text-sm group-hover:text-gray-900 ${
                          selectedMaterial === material
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600'
                        }`}
                      >
                        {material}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Price</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range.label}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange.label === range.label}
                        onChange={() => setSelectedPriceRange(range)}
                        className="w-4 h-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                      />
                      <span
                        className={`ml-3 text-sm group-hover:text-gray-900 ${
                          selectedPriceRange.label === range.label
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-600'
                        }`}
                      >
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filters Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Material
                  </h4>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <label
                        key={material}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="material-mobile"
                          checked={selectedMaterial === material}
                          onChange={() => setSelectedMaterial(material)}
                          className="w-4 h-4 text-gray-900 border-gray-300"
                        />
                        <span
                          className={`ml-3 text-sm ${
                            selectedMaterial === material
                              ? 'text-gray-900 font-medium'
                              : 'text-gray-600'
                          }`}
                        >
                          {material}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    Price
                  </h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <label
                        key={range.label}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="price-mobile"
                          checked={selectedPriceRange.label === range.label}
                          onChange={() => setSelectedPriceRange(range)}
                          className="w-4 h-4 text-gray-900 border-gray-300"
                        />
                        <span
                          className={`ml-3 text-sm ${
                            selectedPriceRange.label === range.label
                              ? 'text-gray-900 font-medium'
                              : 'text-gray-600'
                          }`}
                        >
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Show {filteredProducts.length} results
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-16">
                {filteredProducts.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`}>
                    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="relative aspect-square overflow-hidden bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            addToCart(product.id)
                          }}
                          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md hover:bg-[#3D2B57] hover:text-white flex items-center justify-center transition-colors duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                          {product.material}
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
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No products found</p>
                <button
                  onClick={clearFilters}
                  className="text-gray-900 underline hover:no-underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
