#!/bin/bash

# Kill any process on port 3000
echo "Stopping any process on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Wait a moment
sleep 2

# Clear Next.js cache
echo "Clearing Next.js cache..."
rm -rf .next

# Start the server
echo "Starting Next.js dev server on port 3000..."
npm run dev
