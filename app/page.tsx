import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Armchair, Sparkles, Shield, Truck, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-cream dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-beige to-cream dark:from-gray-800 dark:to-gray-900 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-wood dark:text-cream">
              ORCHID FURNITURE
            </h1>
            <p className="text-xl md:text-2xl text-orchid font-medium">
              Crafted in Wood. Designed for Life.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Premium luxury furniture handcrafted with precision and passion. 
              Transform your space with our exclusive collection of wooden masterpieces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  Explore Collection
                </Button>
              </Link>
              <Link href="/custom">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Customize Your Furniture
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wood dark:text-cream mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Discover our handpicked selection of premium furniture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/shop?category=Chair" className="group">
              <div className="bg-beige dark:bg-gray-700 rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orchid/20 transition-colors">
                  <Armchair className="h-8 w-8 text-wood dark:text-cream" />
                </div>
                <h3 className="text-xl font-semibold text-wood dark:text-cream mb-2">
                  Premium Seating
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Elegant chairs and seating solutions for every room
                </p>
              </div>
            </Link>

            <Link href="/shop?category=Table" className="group">
              <div className="bg-beige dark:bg-gray-700 rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orchid/20 transition-colors">
                  <Sparkles className="h-8 w-8 text-wood dark:text-cream" />
                </div>
                <h3 className="text-xl font-semibold text-wood dark:text-cream mb-2">
                  Tables & Desks
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Functional and stylish tables for work and dining
                </p>
              </div>
            </Link>

            <Link href="/shop?category=Bed" className="group">
              <div className="bg-beige dark:bg-gray-700 rounded-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orchid/20 transition-colors">
                  <Shield className="h-8 w-8 text-wood dark:text-cream" />
                </div>
                <h3 className="text-xl font-semibold text-wood dark:text-cream mb-2">
                  Bedroom Furniture
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Comfortable and elegant bedroom collections
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-beige/30 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wood dark:text-cream mb-4">
              Why Choose ORCHID?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Excellence in every detail, from craft to delivery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orchid/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-orchid" />
              </div>
              <h3 className="text-lg font-semibold text-wood dark:text-cream mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Handcrafted with the finest wood materials and expert craftsmanship
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orchid/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-orchid" />
              </div>
              <h3 className="text-lg font-semibold text-wood dark:text-cream mb-2">
                Lifetime Warranty
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We stand behind our products with comprehensive warranty coverage
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orchid/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-orchid" />
              </div>
              <h3 className="text-lg font-semibold text-wood dark:text-cream mb-2">
                Free Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Complimentary delivery and installation for all orders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-wood dark:text-cream mb-4">
              Customer Testimonials
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              What our happy customers say about us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-beige dark:bg-gray-700 rounded-lg p-6">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-orchid text-orchid" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "Absolutely stunning furniture! The quality is exceptional and the custom options allowed me to get exactly what I wanted. Highly recommended!"
              </p>
              <p className="font-semibold text-wood dark:text-cream">- Priya Sharma</p>
            </div>

            <div className="bg-beige dark:bg-gray-700 rounded-lg p-6">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-orchid text-orchid" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The craftsmanship is incredible. My office table has transformed my workspace. Worth every penny!"
              </p>
              <p className="font-semibold text-wood dark:text-cream">- Rahul Verma</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-wood to-wood-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-lg mb-8 opacity-90">
            Start your journey to beautiful, custom furniture today
          </p>
          <Link href="/custom">
            <Button size="lg" className="bg-orchid hover:bg-orchid/90 text-white">
              Design Your Furniture
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
