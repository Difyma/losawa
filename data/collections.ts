export interface Collection {
  id: string
  name: string
  description: string
  image: string
}

export const collections: Collection[] = [
  {
    id: 'cleopatra',
    name: 'Cleopatra',
    description: 'Egyptian-inspired designs embodying feminine strength and regal allure',
    image: '/products/1.jpg',
  },
  {
    id: 'jacqueline',
    name: 'Jacqueline',
    description: 'Vintage 60s glamour with modern luxury and sophisticated charm',
    image: '/products/14.jpg',
  },
  {
    id: 'eclat',
    name: 'Éclat',
    description: 'Timeless elegance featuring vibrant gemstones and refined craftsmanship',
    image: '/products/22.jpg',
  },
  {
    id: 'embrace',
    name: 'Embrace',
    description: 'Sophisticated designs celebrating love and connection with exquisite gemstones',
    image: '/products/34.jpg',
  },
]
