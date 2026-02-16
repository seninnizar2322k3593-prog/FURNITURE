'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-wood text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">ORCHID</div>
              <div className="text-sm text-orchid font-medium">FURNITURE</div>
            </div>
            <p className="text-sm text-cream/80">
              Crafted in Wood. Designed for Life.
            </p>
            <p className="text-xs text-cream/60">
              Premium luxury furniture for your home
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-cream/80 hover:text-cream transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-cream/80 hover:text-cream transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-cream/80 hover:text-cream transition-colors">
                  Customize
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-cream/80 hover:text-cream transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop?category=Chair" className="text-cream/80 hover:text-cream transition-colors">
                  Chairs
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Table" className="text-cream/80 hover:text-cream transition-colors">
                  Tables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Bed" className="text-cream/80 hover:text-cream transition-colors">
                  Beds
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Sofa" className="text-cream/80 hover:text-cream transition-colors">
                  Sofas
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Cabinet" className="text-cream/80 hover:text-cream transition-colors">
                  Cabinets
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-cream/80 mb-4">
              Subscribe for exclusive offers and updates
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/50"
              />
              <Button type="submit" className="w-full bg-orchid hover:bg-orchid/90 text-white">
                Subscribe
              </Button>
              {subscribed && (
                <p className="text-sm text-green-400">Thank you for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/20 text-center text-sm text-cream/60">
          <p>&copy; {new Date().getFullYear()} Orchid Furniture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
