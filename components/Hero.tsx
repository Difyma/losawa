'use client'

import { useState, useEffect } from 'react'

interface Banner {
  id: string
  title: string
  subtitle: string | null
  image: string
  link: string | null
}

export default function Hero() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanners()
  }, [])

  useEffect(() => {
    if (banners.length === 0) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners])

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners')
      if (res.ok) {
        const data = await res.json()
        setBanners(data)
      }
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fallback slides если баннеры не загрузились
  const fallbackSlides = [
    {
      title: 'Celebrating Love Stories Since 1837',
      subtitle: 'Celebrating love stories since 1837',
      image: '/slide1.jpg',
      link: '#',
    },
  ]

  const slides = banners.length > 0 ? banners : fallbackSlides

  if (loading) {
    return (
      <section className="w-full mt-4 md:mt-6 lg:mt-8 px-4 md:px-6 lg:px-8">
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-gray-200 animate-pulse" />
      </section>
    )
  }

  return (
    <section className="w-full mt-4 md:mt-6 lg:mt-8 px-4 md:px-6 lg:px-8">
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 items-center text-center">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              {slides[currentSlide].title}
            </h1>
            {slides[currentSlide].subtitle && (
              <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-xl mx-auto">
                {slides[currentSlide].subtitle}
              </p>
            )}
            <a
              href={slides[currentSlide].link || '#'}
              className="inline-flex items-center bg-white text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Carousel Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 right-6 md:right-12 flex gap-2">
            {slides.map((_, index) => (
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
        )}
      </div>
    </section>
  )
}
