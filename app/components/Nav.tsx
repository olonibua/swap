'use client'
import { Menu } from 'lucide-react';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link'
import React from 'react'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
              Swapify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/product-catalog"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Product Catalog
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/product-catalog"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Product Catalog
            </Link>
            <Link
              href="/how-it-works"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <button className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-all">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav
