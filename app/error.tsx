'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
        <p className="text-gray-600 mb-8">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#3D2B57] text-white rounded-lg font-medium hover:bg-[#2d1f40] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}
