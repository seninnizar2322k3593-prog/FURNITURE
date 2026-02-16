'use client';

import Link from 'next/link';
import { ShoppingCart, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onCartClick: () => void;
  cartItemCount: number;
}

export default function Navbar({ onCartClick, cartItemCount }: NavbarProps) {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if dark mode is enabled
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-wood/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-wood">ORCHID</div>
            <div className="text-sm text-orchid font-medium">FURNITURE</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-wood hover:text-orchid transition-colors">
              Home
            </Link>
            <Link href="/shop" className="text-wood hover:text-orchid transition-colors">
              Shop
            </Link>
            <Link href="/custom" className="text-wood hover:text-orchid transition-colors">
              Customize
            </Link>
            <Link href="/dashboard" className="text-wood hover:text-orchid transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-beige transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5 text-wood" /> : <Moon className="h-5 w-5 text-wood" />}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 rounded-md hover:bg-beige transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-5 w-5 text-wood" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orchid text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-beige transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-wood" /> : <Menu className="h-5 w-5 text-wood" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 px-4 rounded-md hover:bg-beige text-wood transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block py-2 px-4 rounded-md hover:bg-beige text-wood transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/custom"
              className="block py-2 px-4 rounded-md hover:bg-beige text-wood transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Customize
            </Link>
            <Link
              href="/dashboard"
              className="block py-2 px-4 rounded-md hover:bg-beige text-wood transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
