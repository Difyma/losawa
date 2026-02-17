'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PerfectGift from '@/components/PerfectGift'
import FeaturedProducts from '@/components/FeaturedProducts'
import BestsellersBlock from '@/components/BestsellersBlock'
import CategoryGrid from '@/components/CategoryGrid'
import CategorySlider from '@/components/CategorySlider'
import GiftingServices from '@/components/GiftingServices'
import Newsletter from '@/components/Newsletter'
import PromoBanner from '@/components/PromoBanner'
import Footer from '@/components/Footer'
import Collections from '@/components/Collections'
import { products } from '@/data/products'

export default function Home() {
  const [cartItems, setCartItems] = useState<number[]>([])

  const addToCart = (productId: number) => {
    setCartItems([...cartItems, productId])
  }

  // Get romantic gifts (first 8 products)
  const romanticGifts = products.slice(0, 8)

  // Bestsellers: mix of rings, pendants (necklaces), earrings, bracelets
  const bestsellers = [
    ...products.filter((p) => p.category === 'rings').slice(0, 2),
    ...products.filter((p) => p.category === 'necklaces').slice(0, 1),
    ...products.filter((p) => p.category === 'earrings').slice(0, 2),
    ...products.filter((p) => p.category === 'bracelets').slice(0, 2),
  ].slice(0, 6)

  return (
    <main className="min-h-screen bg-white">
      <Header cartCount={cartItems.length} />
      
      {/* Hero Section */}
      <Hero />

      {/* Shop by Category Grid */}
      <CategoryGrid />

      {/* Bestsellers: rings, pendants, earrings, bracelets */}
      <BestsellersBlock products={bestsellers} onAddToCart={addToCart} />

      {/* Collections */}
      <Collections />

      {/* Category Slider */}
      <CategorySlider />

      {/* Featured Products - Popular purchases */}
      <FeaturedProducts
        products={romanticGifts}
        title="Popular purchases"
        subtitle=""
        onAddToCart={addToCart}
      />

      {/* Promo Banner */}
      <PromoBanner />

      {/* Perfect Gift Section */}
      <PerfectGift />

      {/* Gifting Services */}
      <GiftingServices />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </main>
  )
}
