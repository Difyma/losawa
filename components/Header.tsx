'use client'

import { Search, User, ShoppingBag, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface HeaderProps {
  cartCount: number
}

export default function Header({ cartCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            <Menu className="w-6 h-6 text-gray-900" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/logo-icon.png" 
              alt="Losawa" 
              width={40} 
              height={40} 
              className="h-10 w-auto md:h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              NEW
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              EARRINGS
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              RINGS
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              NECKLACES
            </a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              BRACELETS
            </a>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="hidden md:block text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              LOGIN
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-gray-900" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Profile">
              <User className="w-5 h-5 text-gray-900" />
            </button>
            <button className="relative p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Shopping bag">
              <ShoppingBag className="w-5 h-5 text-gray-900" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                NEW
              </a>
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                EARRINGS
              </a>
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                RINGS
              </a>
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                NECKLACES
              </a>
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                BRACELETS
              </a>
              <a href="#" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                LOGIN
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
