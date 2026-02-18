'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong!</h1>
            <p className="text-gray-600 mb-8">
              {error.message || 'An unexpected error occurred. Please try again.'}
            </p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#3D2B57] text-white rounded-lg font-medium hover:bg-[#2d1f40] transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
