import { BarChart3, Package, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="bg-beige/30 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-wood dark:text-cream mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Overview of your furniture business
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orchid/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-orchid" />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-wood dark:text-cream mb-1">245</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-wood/20 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-wood dark:text-cream" />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-wood dark:text-cream mb-1">48</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Products</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">+25%</span>
            </div>
            <h3 className="text-2xl font-bold text-wood dark:text-cream mb-1">₹12.5L</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Revenue</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">+18%</span>
            </div>
            <h3 className="text-2xl font-bold text-wood dark:text-cream mb-1">1,234</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Customers</p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-5 w-5 text-orchid mr-2" />
              <h2 className="text-xl font-semibold text-wood dark:text-cream">
                Sales Overview
              </h2>
            </div>
            <div className="h-64 bg-beige/30 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Chart placeholder - Analytics coming soon</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-5 w-5 text-orchid mr-2" />
              <h2 className="text-xl font-semibold text-wood dark:text-cream">
                Popular Products
              </h2>
            </div>
            <div className="h-64 bg-beige/30 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Chart placeholder - Analytics coming soon</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold text-wood dark:text-cream mb-4">
            Recent Orders
          </h2>
          <div className="bg-beige/30 dark:bg-gray-700 rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Order management interface coming soon
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              View and manage customer orders, track shipments, and update order status
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
