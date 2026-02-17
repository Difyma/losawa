'use client'

import { useEffect, useState } from 'react'
import { Package, FolderTree, Layers, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  products: number
  categories: number
  collections: number
  orders: number
  pendingOrders: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes, collectionsRes, ordersRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/collections'),
        fetch('/api/admin/orders'),
      ])

      const products = await productsRes.json()
      const categories = await categoriesRes.json()
      const collections = await collectionsRes.json()
      const orders = await ordersRes.json()

      setStats({
        products: products.length || 0,
        categories: categories.length || 0,
        collections: collections.length || 0,
        orders: orders.length || 0,
        pendingOrders: orders.filter((o: any) => o.status === 'pending').length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Products',
      value: stats?.products || 0,
      icon: Package,
      href: '/admin/products',
      color: 'bg-blue-500',
    },
    {
      title: 'Categories',
      value: stats?.categories || 0,
      icon: FolderTree,
      href: '/admin/categories',
      color: 'bg-green-500',
    },
    {
      title: 'Collections',
      value: stats?.collections || 0,
      icon: Layers,
      href: '/admin/collections',
      color: 'bg-purple-500',
    },
    {
      title: 'Orders',
      value: stats?.orders || 0,
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-orange-500',
      subtitle: `${stats?.pendingOrders || 0} pending`,
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to Losawa Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                {card.subtitle && (
                  <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                )}
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products/new"
            className="px-4 py-3 bg-[#3D2B57] text-white rounded-lg hover:bg-[#2d1f40] transition-colors text-center font-medium"
          >
            Add New Product
          </Link>
          <Link
            href="/admin/categories"
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
          >
            Manage Categories
          </Link>
          <Link
            href="/admin/collections"
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
          >
            Manage Collections
          </Link>
        </div>
      </div>
    </div>
  )
}
