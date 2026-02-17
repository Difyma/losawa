'use client'

import { Search, User, ShoppingBag, Menu, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

interface HeaderProps {
  cartCount: number
}

export default function Header({ cartCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [registerModalOpen, setRegisterModalOpen] = useState(false)
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [userMenuOpen])

  const handleSignOut = async () => {
    await signOut()
    setUserMenuOpen(false)
    router.push('/')
    router.refresh()
  }

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
              src="/logo-header.png" 
              alt="Losawa" 
              width={153} 
              height={47} 
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
            <Link href="/about" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              ABOUT US
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {!loading && (
              <>
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                      aria-label="Profile"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    >
                      <User className="w-5 h-5 text-gray-900" />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.email}</p>
                        </div>
                        <button
                          onClick={handleSignOut}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                    aria-label="Login"
                  >
                    <User className="w-5 h-5 text-gray-900" />
                  </button>
                )}
              </>
            )}
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors" aria-label="Search">
              <Search className="w-5 h-5 text-gray-900" />
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
              <Link href="/about" className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                ABOUT US
              </Link>
              {user ? (
                <>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-left text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setLoginModalOpen(true)
                  }}
                  className="text-left text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSwitchToRegister={() => setRegisterModalOpen(true)}
      />
      <RegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onSwitchToLogin={() => setLoginModalOpen(true)}
      />
    </header>
  )
}
