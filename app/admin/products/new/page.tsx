'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Link from 'next/link'

interface ProductImage {
  url: string
  order: number
}

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<any[]>([])
  const [collections, setCollections] = useState<any[]>([])
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    material: '',
    description: '',
    categoryId: '',
    collectionId: '',
    image: '',
    isActive: true,
  })
  const [additionalImages, setAdditionalImages] = useState<ProductImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadingAdditional, setUploadingAdditional] = useState(false)

  useEffect(() => {
    fetchCategories()
    fetchCollections()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/admin/collections')
      const data = await res.json()
      setCollections(data)
    } catch (error) {
      console.error('Error fetching collections:', error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (4MB limit)
    if (file.size > 4 * 1024 * 1024) {
      alert('File too large. Maximum size is 4MB.')
      return
    }

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const contentType = res.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await res.text()
        console.error('Non-JSON response:', text.substring(0, 200))
        alert('Server error. Please try again.')
        return
      }

      const data = await res.json()
      if (res.ok) {
        setFormData((prev) => ({ ...prev, image: data.path }))
      } else {
        alert(data.error || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploadingAdditional(true)
    try {
      const newImages: ProductImage[] = []
      
      for (const file of Array.from(files)) {
        if (file.size > 4 * 1024 * 1024) {
          alert(`File ${file.name} too large. Maximum size is 4MB.`)
          continue
        }

        const uploadFormData = new FormData()
        uploadFormData.append('file', file)

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        const data = await res.json()
        if (res.ok) {
          newImages.push({
            url: data.path,
            order: additionalImages.length + newImages.length,
          })
        }
      }
      
      setAdditionalImages((prev) => [...prev, ...newImages])
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Failed to upload some images')
    } finally {
      setUploadingAdditional(false)
    }
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          additionalImages,
        }),
      })

      if (res.ok) {
        router.push('/admin/products')
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Error creating product:', error)
      alert('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <Link
        href="/admin/products"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create New Product</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B57] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B57] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Material *
              </label>
              <input
                type="text"
                required
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                placeholder="e.g., Yellow Gold, Diamond"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B57] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B57] focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection (Optional)
              </label>
              <select
                value={formData.collectionId}
                onChange={(e) => setFormData({ ...formData, collectionId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B57] focus:border-transparent"
              >
                <option value="">No collection</option>
                {collections.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.isActive ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B57] focus:border-transparent"
              >
                <option value="true">Active</option>
                <option value="false">Hidden</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3D2B57] focus:border-transparent"
            />
          </div>

          {/* Main Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Product Image *
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                <Upload className="w-5 h-5 mr-2" />
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {formData.image && (
                <div className="flex items-center space-x-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <span className="text-sm text-gray-600 truncate max-w-xs">{formData.image}</span>
                </div>
              )}
            </div>
          </div>

          {/* Additional Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Images
            </label>
            <div className="space-y-3">
              {/* Upload button */}
              <label className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                <Upload className="w-5 h-5 mr-2" />
                {uploadingAdditional ? 'Uploading...' : 'Add Images'}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImageUpload}
                  className="hidden"
                />
              </label>

              {/* Images list */}
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {additionalImages.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={img.url}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Controls */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="p-1 bg-white rounded shadow hover:bg-red-50 text-red-600"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-1 text-center">
                        Image {index + 2}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t">
            <Link
              href="/admin/products"
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#3D2B57] text-white rounded-lg hover:bg-[#2d1f40] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
