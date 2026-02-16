'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { formatCurrency } from '@/lib/utils';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  category: string;
  images: string[];
  stock: number;
  woodTypes: { id: string; name: string; priceMultiplier: number }[];
  colors: { id: string; name: string; hexCode: string }[];
}

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWood, setSelectedWood] = useState(product.woodTypes[0]?.id || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id || '');
  const [quantity, setQuantity] = useState(1);

  const woodMultiplier = product.woodTypes.find((w) => w.id === selectedWood)?.priceMultiplier || 1;
  const finalPrice = product.basePrice * woodMultiplier;

  const handleAddToCart = async () => {
    // TODO: Implement add to cart functionality
    alert('Add to cart functionality will be implemented with cart API');
  };

  return (
    <div className="bg-beige/30 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-orchid">
            Home
          </Link>
          {' / '}
          <Link href="/shop" className="hover:text-orchid">
            Shop
          </Link>
          {' / '}
          <span className="text-wood dark:text-cream">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square bg-white dark:bg-gray-800 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-orchid' : ''
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-wood dark:text-cream mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">{product.category}</p>
            </div>

            <div className="text-3xl font-bold text-wood dark:text-cream">
              {formatCurrency(finalPrice)}
            </div>

            <div className="border-t border-b border-gray-200 dark:border-gray-700 py-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

              {/* Stock Status */}
              <div>
                {product.stock > 0 ? (
                  <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="inline-block bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 px-3 py-1 rounded-full text-sm">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Wood Type Selection */}
            {product.woodTypes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  Select Wood Type
                </label>
                <Select
                  value={selectedWood}
                  onChange={(e) => setSelectedWood(e.target.value)}
                >
                  {product.woodTypes.map((wood) => (
                    <option key={wood.id} value={wood.id}>
                      {wood.name} (+{((wood.priceMultiplier - 1) * 100).toFixed(0)}%)
                    </option>
                  ))}
                </Select>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                  Select Color
                </label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedColor === color.id
                          ? 'border-orchid scale-110'
                          : 'border-gray-300 dark:border-gray-600'
                      } transition-transform`}
                      style={{ backgroundColor: color.hexCode }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 bg-beige dark:bg-gray-800 rounded-md hover:bg-beige-100 dark:hover:bg-gray-700"
                >
                  <Minus className="h-4 w-4 text-wood dark:text-cream" />
                </button>
                <span className="text-lg font-semibold text-wood dark:text-cream w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 bg-beige dark:bg-gray-800 rounded-md hover:bg-beige-100 dark:hover:bg-gray-700"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4 text-wood dark:text-cream" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            {/* Custom Furniture CTA */}
            <div className="bg-orchid/10 dark:bg-orchid/20 rounded-lg p-4 text-center">
              <p className="text-sm text-wood dark:text-cream mb-2">
                Want custom dimensions or finish?
              </p>
              <Link href="/custom">
                <Button variant="outline" size="sm">
                  Design Your Own
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
