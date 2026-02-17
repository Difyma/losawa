'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo & About */}
          <div className="lg:col-span-1">
            <Image 
              src="/logo-full.png" 
              alt="Losawa" 
              width={150} 
              height={50} 
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Exquisite handcrafted jewelry inspired by timeless elegance. 
              Each piece tells a story of craftsmanship and beauty.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/rings" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/category/earrings" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/category/necklaces" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/category/bracelets" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Jewelry Lane,<br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors text-sm">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <a href="mailto:hello@losawa.com" className="text-gray-400 hover:text-white transition-colors text-sm">
                  hello@losawa.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Losawa. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
