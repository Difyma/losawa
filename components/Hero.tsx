'use client'

import { useState, useEffect } from 'react'
import { ChevronRight } from 'lucide-react'

const heroSlides = [
  {
    title: 'Celebrating Love Stories Since 1837',
    subtitle: 'Celebrating love stories since 1837',
    ctaText: 'Shop Now',
    ctaLink: '#',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop',
  },
  {
    title: 'Elegance in Every Detail',
    subtitle: 'Handcrafted with the finest quality',
    ctaText: 'Shop Now',
    ctaLink: '#',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=600&fit=crop',
  },
  {
    title: 'Your Unique Style',
    subtitle: 'Custom personalized jewelry',
    ctaText: 'Shop Now',
    ctaLink: '#',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1200&h=600&fit=crop',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="w-full mt-4 md:mt-6 lg:mt-8 px-4 md:px-6 lg:px-8">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt={heroSlides[currentSlide].title}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center items-center px-6 md:px-12 lg:px-16 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 max-w-4xl">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl">
            {heroSlides[currentSlide].subtitle}
          </p>
          <a
            href={heroSlides[currentSlide].ctaLink}
            className="inline-flex items-center bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors"
          >
            {heroSlides[currentSlide].ctaText}
          </a>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 right-6 md:right-12 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
