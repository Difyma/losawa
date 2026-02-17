# Backend Setup

## Database Setup

This project uses Prisma ORM with SQLite for data storage.

### Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database:**
   ```bash
   npm run db:seed
   ```
   
   Note: The seed script uses direct SQLite access. Make sure the database file exists and migrations are applied first.

### Database Schema

- **Category**: Product categories (rings, earrings, necklaces, bracelets)
- **Collection**: Product collections (Cleopatra, Jacqueline, Éclat, Embrace)
- **Product**: Products with links to categories and collections
- **Order**: Customer orders
- **OrderItem**: Individual items in an order

### API Routes

- `GET /api/products` - Get all products (with optional filters: category, collection, material, minPrice, maxPrice)
- `GET /api/products/[id]` - Get a single product
- `GET /api/collections` - Get all collections
- `GET /api/collections/[slug]` - Get a single collection with products
- `GET /api/categories` - Get all categories
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Get orders (optional email filter)

### Example API Usage

```typescript
// Get all products
const products = await fetch('/api/products').then(r => r.json())

// Get products by category
const rings = await fetch('/api/products?category=rings').then(r => r.json())

// Get products by collection
const cleopatra = await fetch('/api/products?collection=cleopatra').then(r => r.json())

// Create an order
const order = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'John Doe',
    email: 'john@example.com',
    address: '123 Main St',
    city: 'New York',
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 }
    ]
  })
}).then(r => r.json())
```

### Development

- Database file: `prisma/dev.db`
- Prisma Studio (visual database browser): `npx prisma studio`
