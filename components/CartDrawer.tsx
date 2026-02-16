'use client';

import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  woodType?: string;
  color?: string;
  isCustom?: boolean;
}

export default function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-wood dark:text-cream" />
              <h2 className="text-lg font-semibold text-wood dark:text-cream">
                Shopping Cart ({items.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-beige dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5 text-wood dark:text-cream" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400 mb-2">Your cart is empty</p>
                <Link href="/shop" onClick={() => setIsCartOpen(false)}>
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex space-x-3 bg-beige/30 dark:bg-gray-800 rounded-lg p-3">
                  {item.image && (
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-beige flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-wood dark:text-cream text-sm line-clamp-1">
                      {item.name}
                    </h3>
                    {item.woodType && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">Wood: {item.woodType}</p>
                    )}
                    {item.color && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">Color: {item.color}</p>
                    )}
                    {item.isCustom && (
                      <span className="inline-block text-xs bg-orchid/20 text-orchid px-2 py-0.5 rounded mt-1">
                        Custom
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3 text-wood dark:text-cream" />
                        </button>
                        <span className="text-sm font-medium text-wood dark:text-cream w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-white dark:hover:bg-gray-700 rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3 text-wood dark:text-cream" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-wood dark:text-cream mt-1">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span className="text-wood dark:text-cream">Total:</span>
                <span className="text-wood dark:text-cream">{formatCurrency(total)}</span>
              </div>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)} className="block">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/cart" onClick={() => setIsCartOpen(false)} className="block">
                <Button variant="outline" className="w-full">
                  View Full Cart
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
