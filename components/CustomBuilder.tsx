'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { formatCurrency, calculateCustomPrice } from '@/lib/utils';
import { Upload, ShoppingCart } from 'lucide-react';
import Image from 'next/image';

const furnitureTypes = [
  { value: 'chair', label: 'Chair', basePrice: 12999 },
  { value: 'table', label: 'Table', basePrice: 34999 },
  { value: 'bed', label: 'Bed', basePrice: 54999 },
  { value: 'cabinet', label: 'Cabinet', basePrice: 28999 },
  { value: 'sofa', label: 'Sofa', basePrice: 64999 },
];

const woodTypes = [
  { value: 'Teak', label: 'Teak', multiplier: 1.5 },
  { value: 'Oak', label: 'Oak', multiplier: 1.3 },
  { value: 'Sheesham', label: 'Sheesham', multiplier: 1.0 },
  { value: 'Walnut', label: 'Walnut', multiplier: 1.4 },
];

const woodColors = [
  { value: 'Natural', label: 'Natural', hex: '#D2B48C' },
  { value: 'Walnut', label: 'Walnut', hex: '#5C4033' },
  { value: 'Mahogany', label: 'Mahogany', hex: '#C04000' },
  { value: 'White', label: 'White', hex: '#FFFFFF' },
];

const finishes = ['Matte', 'Glossy', 'Natural'];

export default function CustomBuilder() {
  const [furnitureType, setFurnitureType] = useState('chair');
  const [woodType, setWoodType] = useState('Sheesham');
  const [woodColor, setWoodColor] = useState('Natural');
  const [finish, setFinish] = useState('Natural');
  const [width, setWidth] = useState(36);
  const [height, setHeight] = useState(36);
  const [depth, setDepth] = useState(18);
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [price, setPrice] = useState(0);

  const basePrice = furnitureTypes.find((t) => t.value === furnitureType)?.basePrice || 0;
  const multiplier = woodTypes.find((w) => w.value === woodType)?.multiplier || 1;

  useEffect(() => {
    const calculatedPrice = calculateCustomPrice({
      basePrice,
      woodMultiplier: multiplier,
      dimensions: { width, height, depth },
    });
    setPrice(calculatedPrice);
  }, [furnitureType, woodType, width, height, depth, basePrice, multiplier]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    alert('Custom furniture will be added to cart (API integration pending)');
  };

  return (
    <div className="bg-beige/30 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-wood dark:text-cream mb-2">
            Custom Furniture Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Design your perfect piece - customize dimensions, wood, and finish
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-wood dark:text-cream mb-4">
              Configuration
            </h2>

            {/* Furniture Type */}
            <div>
              <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                Furniture Type
              </label>
              <Select value={furnitureType} onChange={(e) => setFurnitureType(e.target.value)}>
                {furnitureTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} (Base: {formatCurrency(type.basePrice)})
                  </option>
                ))}
              </Select>
            </div>

            {/* Wood Type */}
            <div>
              <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                Wood Type
              </label>
              <Select value={woodType} onChange={(e) => setWoodType(e.target.value)}>
                {woodTypes.map((wood) => (
                  <option key={wood.value} value={wood.value}>
                    {wood.label} (×{wood.multiplier})
                  </option>
                ))}
              </Select>
            </div>

            {/* Wood Color */}
            <div>
              <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                Wood Color
              </label>
              <div className="flex gap-3 mb-2">
                {woodColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setWoodColor(color.value)}
                    className={`w-12 h-12 rounded-full border-2 ${
                      woodColor === color.value
                        ? 'border-orchid scale-110'
                        : 'border-gray-300 dark:border-gray-600'
                    } transition-transform`}
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Selected: {woodColor}
              </p>
            </div>

            {/* Finish */}
            <div>
              <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                Finish
              </label>
              <Select value={finish} onChange={(e) => setFinish(e.target.value)}>
                {finishes.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </Select>
            </div>

            {/* Dimensions */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="font-medium text-wood dark:text-cream mb-4">
                Dimensions (inches)
              </h3>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Width
                  </label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    min={12}
                    max={120}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Height
                  </label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    min={12}
                    max={120}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Depth
                  </label>
                  <Input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    min={12}
                    max={120}
                  />
                </div>
              </div>
            </div>

            {/* Reference Image Upload */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
                Reference Image (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="reference-upload"
                />
                <label
                  htmlFor="reference-upload"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-orchid transition-colors"
                >
                  {referenceImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={referenceImage}
                        alt="Reference"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click to upload reference image
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Preview & Price Panel */}
          <div className="space-y-6">
            {/* Visual Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-wood dark:text-cream mb-4">
                Preview
              </h2>
              <div className="bg-beige dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="text-sm mb-2">3D Preview (Coming Soon)</p>
                  <p className="text-xs">
                    {furnitureType.charAt(0).toUpperCase() + furnitureType.slice(1)} - {woodType}
                  </p>
                  <p className="text-xs mt-1">
                    {width}" × {height}" × {depth}"
                  </p>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-br from-wood to-wood-dark text-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-90">Base Price:</span>
                  <span>{formatCurrency(basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Wood Multiplier:</span>
                  <span>×{multiplier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Size Adjustment:</span>
                  <span>Included</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Price:</span>
                  <span className="text-2xl font-bold">{formatCurrency(price)}</span>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-orchid hover:bg-orchid/90 text-white"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Specifications */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-wood dark:text-cream mb-3">
                Specifications
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Type:</span>
                  <span className="text-wood dark:text-cream font-medium">
                    {furnitureType.charAt(0).toUpperCase() + furnitureType.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Wood:</span>
                  <span className="text-wood dark:text-cream font-medium">{woodType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Color:</span>
                  <span className="text-wood dark:text-cream font-medium">{woodColor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Finish:</span>
                  <span className="text-wood dark:text-cream font-medium">{finish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Dimensions:</span>
                  <span className="text-wood dark:text-cream font-medium">
                    {width}" × {height}" × {depth}"
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
