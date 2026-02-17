'use client'

import Link from 'next/link'

export default function SplitBanner() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Left panel — text + CTA */}
          <div className="relative flex flex-col justify-between min-h-[320px] md:min-h-[400px] lg:min-h-[480px] p-8 md:p-10 lg:p-12 bg-gradient-to-b from-gray-50 to-gray-100/80">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Losawa Fine Jewelry
              </h2>
              <p className="text-gray-600 text-base md:text-lg max-w-md">
                Handcrafted pieces tailored to embrace every moment — from everyday elegance to life&apos;s milestones.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#3D2B57] text-white font-semibold rounded-xl hover:bg-[#2d1f40] transition-colors duration-200 uppercase tracking-wide text-sm"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right panel — image */}
          <div className="relative min-h-[280px] md:min-h-[360px] lg:min-h-[480px] overflow-hidden bg-gray-200">
            <img
              src="/APR01423.JPG"
              alt="Losawa fine jewelry"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
