import { useState, useEffect } from 'react'
import { getProducts, Product } from '@/lib/api'

export function useProducts(filters?: {
  category?: string
  collection?: string
  material?: string
  minPrice?: number
  maxPrice?: number
}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        const data = await getProducts(filters)
        if (!cancelled) {
          // Filter out any invalid products
          setProducts(Array.isArray(data) ? data.filter(p => p && p.id) : [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch products')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProducts()

    return () => {
      cancelled = true
    }
  }, [filters?.category, filters?.collection, filters?.material, filters?.minPrice, filters?.maxPrice])

  return { products, loading, error }
}
