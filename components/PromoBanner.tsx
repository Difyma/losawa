'use client'

export default function PromoBanner() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gray-900">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop"
              alt="Promo background"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          
          {/* Content */}
          <div className="relative z-10 py-16 md:py-24 px-8 md:px-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Discover Timeless Elegance
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Explore our exclusive collection of handcrafted jewelry, designed to make every moment special
            </p>
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors duration-200">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
