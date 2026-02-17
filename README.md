# Losawa - Fine Jewelry Store

Modern adaptive fine jewelry e-commerce store built with Next.js and Tailwind CSS.

## Features

- ✨ Modern minimalist design
- 📱 Fully responsive interface for all devices
- 🎨 Clean and elegant UI in premium brand style
- 🛍️ Functional shopping cart
- 🔍 Product filtering and sorting
- ⚡ Fast loading thanks to Next.js

## Technologies

- **Next.js 14** - React framework for production
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icons

## Installation and Running

1. Install dependencies:
```bash
npm install
```

2. Run dev server:
```bash
npm run dev
```

Or with clean cache:
```bash
npm run dev:clean
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Troubleshooting

### Port Already in Use Error (EADDRINUSE)

If you see `Error: listen EADDRINUSE: address already in use :::3000`, follow these steps:

**Option 1: Stop the process manually**
```bash
# Find what's using port 3000
lsof -i:3000

# Kill the process (replace PID with actual process ID)
kill -9 <PID>

# Or kill all node processes (be careful!)
killall -9 node
```

**Option 2: Use alternative port**
```bash
npm run dev:alt
```
This will start on port 3001 instead.

**Option 3: Use the start script**
```bash
./start.sh
```
This script automatically stops any process on port 3000 before starting.

### 404 Errors

Clear Next.js cache:
```bash
rm -rf .next
npm run dev
```

### Changes Not Appearing

Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

### Multiple Server Instances

If you have multiple Next.js servers running:
```bash
# Find all Next.js processes
ps aux | grep "next dev"

# Kill all Next.js processes
pkill -f "next dev"
```

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Header.tsx       # Site header
│   ├── Hero.tsx         # Hero section with carousel
│   ├── ProductGrid.tsx  # Product grid
│   └── Filters.tsx      # Filters and sorting
└── data/
    └── products.ts      # Product data
```

## Responsiveness

Design adapts to the following screen sizes:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## License

MIT
