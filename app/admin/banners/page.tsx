'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react'

interface Banner {
  id: string
  title: string
  subtitle: string | null
  image: string
  link: string | null
  order: number
  isActive: boolean
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/admin/banners')
      const data = await res.json()
      setBanners(data)
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) {
      return
    }

    try {
      const res = await fetch(`/api/admin/banners/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchBanners()
      } else {
        alert('Failed to delete banner')
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
      alert('Failed to delete banner')
    }
  }

  const handleToggleActive = async (banner: Banner) => {
    try {
      const res = await fetch(`/api/admin/banners/${banner.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
      })

      if (res.ok) {
        fetchBanners()
      }
    } catch (error) {
      console.error('Error updating banner:', error)
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Banners</h1>
          <p className="text-gray-600 mt-1">Manage homepage banners</p>
        </div>
        <Link
          href="/admin/banners/new"
          className="flex items-center px-4 py-2 bg-[#3D2B57] text-white rounded-lg hover:bg-[#2d1f40] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Banner
        </Link>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl">
            No banners found. Create your first banner!
          </div>
        ) : (
          banners.map((banner) => (
            <div
              key={banner.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                !banner.isActive ? 'opacity-60' : ''
              }`}
            >
              {/* Banner Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.jpg'
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleToggleActive(banner)}
                    className={`p-2 rounded-lg ${
                      banner.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                    title={banner.isActive ? 'Active' : 'Hidden'}
                  >
                    {banner.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="flex items-center justify-center w-8 h-8 bg-[#3D2B57] text-white rounded-lg font-bold">
                    {banner.order}
                  </span>
                </div>
              </div>

              {/* Banner Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">{banner.title}</h3>
                {banner.subtitle && (
                  <p className="text-sm text-gray-600 mb-2">{banner.subtitle}</p>
                )}
                {banner.link && (
                  <p className="text-xs text-gray-500 mb-3 truncate">{banner.link}</p>
                )}

                {/* Actions */}
                <div className="flex items-center justify-end space-x-2 pt-3 border-t">
                  <Link
                    href={`/admin/banners/${banner.id}`}
                    className="p-2 text-[#3D2B57] hover:bg-gray-100 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
