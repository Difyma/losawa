// API utility functions

export interface Product {
  id: number
  name: string
  price: number
  image: string
  material: string
  description?: string
  dateAdded: string
  category: {
    id: string
    slug: string
    name: string
  }
  collection?: {
    id: string
    slug: string
    name: string
  }
}

export interface Collection {
  id: string
  slug: string
  name: string
  description: string
  image: string
  subtitle?: string
  quote?: string
  fullDescription?: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
}

// Fetch all products with optional filters
export async function getProducts(filters?: {
  category?: string
  collection?: string
  material?: string
  minPrice?: number
  maxPrice?: number
}): Promise<Product[]> {
  const params = new URLSearchParams()
  if (filters?.category) params.append('category', filters.category)
  if (filters?.collection) params.append('collection', filters.collection)
  if (filters?.material) params.append('material', filters.material)
  if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
  if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())

  const url = `/api/products${params.toString() ? `?${params.toString()}` : ''}`
  const res = await fetch(url)
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Failed to fetch products' }))
    throw new Error(error.error || 'Failed to fetch products')
  }
  const data = await res.json()
  // Ensure we return an array and filter out invalid items
  return Array.isArray(data) ? data.filter(p => p && p.id && p.name) : []
}

// Fetch a single product
export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json()
}

// Fetch all collections
export async function getCollections(): Promise<Collection[]> {
  const res = await fetch('/api/collections')
  if (!res.ok) throw new Error('Failed to fetch collections')
  return res.json()
}

// Fetch a single collection
export async function getCollection(slug: string): Promise<Collection & { products: Product[] }> {
  const res = await fetch(`/api/collections/${slug}`)
  if (!res.ok) throw new Error('Failed to fetch collection')
  return res.json()
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  const res = await fetch('/api/categories')
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

// Create an order
export async function createOrder(orderData: {
  customerName: string
  email: string
  phone?: string
  address: string
  city: string
  country?: string
  postalCode?: string
  items: Array<{ productId: number; quantity: number }>
  notes?: string
}) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Failed to create order')
  }
  return res.json()
}
