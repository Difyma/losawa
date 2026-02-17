'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Subscription logic will go here
    console.log('Subscribing to:', email)
    setEmail('')
  }

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Mail className="w-12 h-12 md:w-16 md:h-16 text-gray-900 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Latest from Losawa
          </h2>
          <p className="text-gray-600 text-sm md:text-base mb-8 max-w-2xl mx-auto">
            Sign up for our newsletter to be the first to know about new collections, exclusive offers, and special events.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
            />
            <button
              type="submit"
              className="px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm md:text-base whitespace-nowrap"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
