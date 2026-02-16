'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreditCard, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement Stripe checkout session creation
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [], // TODO: Get from cart
          customer: formData,
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert('Error creating checkout session. Please ensure Stripe is configured.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-beige/30 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-wood dark:text-cream mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Billing Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-orchid mr-2" />
              <h2 className="text-xl font-semibold text-wood dark:text-cream">
                Billing & Shipping Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  Full Name *
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  Phone *
                </label>
                <Input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  PIN Code *
                </label>
                <Input
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  placeholder="110001"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  Address *
                </label>
                <Textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  City *
                </label>
                <Input
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="New Delhi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  State *
                </label>
                <Input
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Delhi"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  Order Notes (Optional)
                </label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any special instructions for delivery"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="h-5 w-5 text-orchid mr-2" />
              <h2 className="text-xl font-semibold text-wood dark:text-cream">
                Payment Method
              </h2>
            </div>

            <div className="bg-beige/30 dark:bg-gray-700 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                You will be redirected to Stripe's secure checkout page to complete your payment.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                <span className="text-wood dark:text-cream font-medium">₹0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-wood dark:text-cream">Total:</span>
                  <span className="text-2xl font-bold text-wood dark:text-cream">₹0</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            Your payment information is secure and encrypted. We never store your card details.
          </p>
        </form>
      </div>
    </div>
  );
}
