'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Minus, Plus, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react'
import Header from '@/components/Header'

interface Product {
  id: number
  name: string
  price: number
  image: string
  images: string[]  // Массив всех изображений
  material: string
  description?: string
  dateAdded: string
  category: {
    id: string
    slug: string
    name: string
  }
  collection?: {
    id: string
    slug: string
    name: string
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price)
}

export default function ProductPage() {
  const params = useParams()
  const productId = parseInt(params.id as string)
  const [cartItems, setCartItems] = useState<number[]>([])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Загружаем товар из API
  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        
        // Загружаем конкретный товар
        const res = await fetch(`/api/products/${productId}`)
        if (!res.ok) {
          if (res.status === 404) {
            setError('Product not found')
          } else {
            setError('Failed to load product')
          }
          setLoading(false)
          return
        }
        
        const productData = await res.json()
        setProduct(productData)
        
        // Загружаем все товары для поиска похожих
        const allRes = await fetch('/api/products')
        if (allRes.ok) {
          const allProducts = await allRes.json()
          const related = allProducts
            .filter((p: Product) => p.category?.slug === productData.category?.slug && p.id !== productId)
            .slice(0, 4)
          setRelatedProducts(related)
        }
        
        setLoading(false)
      } catch (err) {
        setError('Failed to load product')
        setLoading(false)
      }
    }
    
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Header cartCount={0} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-white">
        <Header cartCount={cartItems.length} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || 'Product not found'}</h1>
          <Link href="/" className="text-gray-600 hover:text-gray-900 underline">
            Return to home
          </Link>
        </div>
      </main>
    )
  }

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      setCartItems(prev => [...prev, product.id])
    }
  }

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

  // Use images array from API, fallback to single image
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]

  return (
    <main className="min-h-screen bg-white">
      <Header cartCount={cartItems.length} />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            {product.category && (
              <>
                <Link href={`/category/${product.category.slug}`} className="hover:text-gray-900">
                  {product.category.name}
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
              </>
            )}
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = '/products/1.jpg'
                }}
              />
            </div>
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = '/products/1.jpg'
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Collection Badge */}
            <span className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.collection?.name || product.material.split(',')[0]}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-3xl font-semibold text-gray-900 mb-6">
              {formatPrice(product.price)}
            </p>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description || `Exquisite ${product.name.toLowerCase()} crafted from the finest materials. 
              This stunning piece features ${product.material.toLowerCase()}, showcasing exceptional 
              craftsmanship and timeless elegance. Perfect for special occasions or everyday luxury.`}
            </p>

            {/* Material Info */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Materials</h3>
              <p className="text-gray-600">{product.material}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-900">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="p-3 hover:bg-gray-50 transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={addToCart}
                className="flex-1 bg-[#3D2B57] text-white py-4 px-8 rounded-xl font-medium hover:bg-[#2d1f40] transition-colors"
              >
                Add to Cart — {formatPrice(product.price * quantity)}
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 rounded-xl border-2 transition-colors ${
                  isWishlisted 
                    ? 'border-red-500 text-red-500 bg-red-50' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              <button className="p-4 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-gray-600 mb-2" />
                <span className="text-xs text-gray-600">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="w-6 h-6 text-gray-600 mb-2" />
                <span className="text-xs text-gray-600">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw className="w-6 h-6 text-gray-600 mb-2" />
                <span className="text-xs text-gray-600">30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-100 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = '/products/1.jpg'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      {relatedProduct.category?.name}
                    </p>
                    <h3 className="text-base font-medium text-gray-900 mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
