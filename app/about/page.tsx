'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const [cartItems] = useState<number[]>([])

  return (
    <main className="min-h-screen bg-white">
      <Header cartCount={cartItems.length} />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              About Us
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Losawo redefines luxury jewelry by creating statement pieces that reflect elegance and unique character.
            </p>
          </div>

          {/* Main Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16">
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop"
                alt="Losawo jewelry craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Striving for excellence and innovation in craftsmanship, our jewelry uncovers the true essence and charm of gemstones, ensuring that each design is as exquisite as the person wearing it. Our distinctive pieces empower you to embrace your individuality.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Each piece in the Losawo collection highlights the beauty and distinctiveness of natural gemstones. Our designs fuse dramatic and romantic aesthetics by integrating bold geometric shapes with soft edges, imparting a special character that blends strength and power with a distinctly feminine nature.
              </p>
            </div>
          </div>

          {/* Behind the Heart Section */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
              Behind the Heart of Losawo
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
              {/* Text */}
              <div className="space-y-6">
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Established in 2020, Losawo embodies the spirit of &ldquo;love without limits.&rdquo; This sentiment is the heartbeat of our brand.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Founder Tais Farkhodova is a gemologist and jewelry designer. Raised in a gem-dealing family, she discovered the enchantment of precious stones from a young age. Her passion for gemstones goes beyond their sparkle and fascinating beauty to encompass the spiritual energy fields they create.
                </p>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  Tais believes each stone forms an intimate connection with its owner, and when it finds a home in our jewelry, it transforms into a profound symbol of personal power.
                </p>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=1000&fit=crop"
                  alt="Tais Farkhodova - Founder"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Losawo&apos;s jewelry collection captures and narrates diverse emotions inspired by the beauty of nature, people, and cultures. Far beyond mere adornments, our jewelry is the voice that tells your story, making each piece a unique expression of personal significance.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                Losawo pieces are not only a timeless investment, appreciating in value over the years, but become beloved family treasures and talismans that bear meaningful stories to hand down through generations.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gray-50 rounded-2xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Discover Your Story
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mb-8">
              We invite you to explore our collection and discover unique designs that resonate with your spirit. At Losawo, we craft more than jewelry — we create the key to your inner world, the embodiment of your authenticity, and the gateway to your confident, elegant luxury style.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#3D2B57] text-white font-semibold rounded-xl hover:bg-[#2d1f40] transition-colors duration-200 uppercase tracking-wide text-sm"
            >
              Explore Collection
            </Link>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  )
}
