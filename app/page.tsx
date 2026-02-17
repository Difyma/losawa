'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PerfectGift from '@/components/PerfectGift'
import BestsellersBlock from '@/components/BestsellersBlock'
import SplitBanner from '@/components/SplitBanner'
import ShopByCategoryFilter from '@/components/ShopByCategoryFilter'
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

      {/* Our Collections */}
      <Collections />

      {/* Shop by Category: filter buttons + product grid + More */}
      <ShopByCategoryFilter products={products} onAddToCart={addToCart} />

      {/* Split banner with CTA */}
      <SplitBanner />

      {/* Bestsellers: rings, pendants, earrings, bracelets */}
      <BestsellersBlock products={bestsellers} onAddToCart={addToCart} />

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
