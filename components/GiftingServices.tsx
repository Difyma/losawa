'use client'

import { Calendar, PenTool, MessageCircle } from 'lucide-react'

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  linkText: string
}

const services: Service[] = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Book an Appointment',
    description: 'Master the art of gifting with a one-on-one in-store or virtual appointment with a Losawa client advisor.',
    link: '#',
    linkText: 'Book an Appointment',
  },
  {
    icon: <PenTool className="w-8 h-8" />,
    title: 'Engrave Your Gift',
    description: 'Make a design from Losawa even more memorable with bespoke engraving.',
    link: '#',
    linkText: 'Learn More',
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Contact Us',
    description: 'From tailored gifting advice to providing in-store or virtual shopping appointments, we are always at your service.',
    link: '#',
    linkText: 'Learn More',
  },
]

export default function GiftingServices() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
          Discover Our Gifting Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-gray-900 mb-4">{service.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                {service.description}
              </p>
              <a
                href={service.link}
                className="inline-flex items-center text-sm md:text-base font-medium text-gray-900 hover:text-gray-600 transition-colors border-b border-gray-900 hover:border-gray-600 pb-1"
              >
                {service.linkText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
