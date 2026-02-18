/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add trailing slash for consistent URL handling
  trailingSlash: false,
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  // Ensure environment variables are available
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'file:./prisma/dev.db',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Skip type checking during build (we run it separately)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Skip eslint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
