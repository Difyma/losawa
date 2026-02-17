'use client'

import { useState } from 'react'

interface FiltersProps {
  selectedCategory: string
  selectedMaterial: string
  sortBy: string
  onCategoryChange: (category: string) => void
  onMaterialChange: (material: string) => void
  onSortChange: (sort: string) => void
}

export default function Filters({
  selectedCategory,
  selectedMaterial,
  sortBy,
  onCategoryChange,
  onMaterialChange,
  onSortChange,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sortOptions = [
    { value: 'featured', label: 'Рекомендуемые' },
    { value: 'newest', label: 'Новинки' },
    { value: 'lowest', label: 'По возрастанию цены' },
    { value: 'highest', label: 'По убыванию цены' },
  ]

  const categoryOptions = [
    { value: 'all', label: 'Все категории' },
    { value: 'earrings', label: 'Серьги' },
    { value: 'rings', label: 'Кольца' },
    { value: 'necklaces', label: 'Ожерелья' },
    { value: 'bracelets', label: 'Браслеты' },
  ]

  const materialOptions = [
    { value: 'all', label: 'Все материалы' },
    { value: 'yellow-gold', label: 'Желтое золото' },
    { value: 'white-gold', label: 'Белое золото' },
    { value: 'rose-gold', label: 'Розовое золото' },
    { value: 'silver', label: 'Серебро' },
  ]

  return (
    <div className="lg:sticky lg:top-24">
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl font-medium text-gray-900 mb-4 transition-colors flex items-center justify-between"
      >
        <span>Фильтры и сортировка</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Filters Panel */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } lg:block bg-white border border-gray-100 rounded-xl p-6 space-y-8`}
      >
        {/* Sort By */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
            СОРТИРОВКА
          </h3>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`block w-full text-left text-sm py-2 transition-colors ${
                  sortBy === option.value
                    ? 'font-semibold text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
            КАТЕГОРИЯ
          </h3>
          <div className="space-y-2">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onCategoryChange(option.value)}
                className={`block w-full text-left text-sm py-2 transition-colors ${
                  selectedCategory === option.value
                    ? 'font-semibold text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Material */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
            МАТЕРИАЛ
          </h3>
          <div className="space-y-2">
            {materialOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onMaterialChange(option.value)}
                className={`block w-full text-left text-sm py-2 transition-colors ${
                  selectedMaterial === option.value
                    ? 'font-semibold text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
