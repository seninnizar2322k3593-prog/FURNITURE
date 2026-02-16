import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CartPage() {
  return (
    <div className="bg-beige/30 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-wood dark:text-cream mb-8">
          Shopping Cart
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is a fallback cart page. The primary cart interface is the slide-out drawer.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Click the cart icon in the navigation bar to view and manage your cart items.
          </p>
          <Link href="/shop">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
