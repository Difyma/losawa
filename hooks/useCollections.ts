import { useState, useEffect } from 'react'
import { getCollections, Collection } from '@/lib/api'

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchCollections() {
      try {
        setLoading(true)
        setError(null)
        const data = await getCollections()
        if (!cancelled) {
          setCollections(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch collections')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchCollections()

    return () => {
      cancelled = true
    }
  }, [])

  return { collections, loading, error }
}
