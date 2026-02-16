'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Select } from './ui/select';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

const categories = ['Chair', 'Table', 'Bed', 'Cabinet', 'Sofa'];
const woodTypes = ['Teak', 'Oak', 'Sheesham', 'Walnut'];
const colors = ['Natural', 'Walnut', 'Mahogany', 'White'];
const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'latest', label: 'Latest' },
  { value: 'popularity', label: 'Most Popular' },
];

export default function FilterSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [wood, setWood] = useState(searchParams.get('wood') || '');
  const [color, setColor] = useState(searchParams.get('color') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');

  const updateFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (wood) params.set('wood', wood);
    if (color) params.set('color', color);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sort) params.set('sort', sort);

    router.push(`/shop?${params.toString()}`);
  };

  const clearFilters = () => {
    setCategory('');
    setWood('');
    setColor('');
    setMaxPrice('');
    setSort('');
    router.push('/shop');
  };

  useEffect(() => {
    updateFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, wood, color, maxPrice, sort]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-wood dark:text-cream">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
          Category
        </label>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </div>

      {/* Wood Type Filter */}
      <div>
        <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
          Wood Type
        </label>
        <Select value={wood} onChange={(e) => setWood(e.target.value)}>
          <option value="">All Wood Types</option>
          {woodTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>

      {/* Color Filter */}
      <div>
        <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
          Color
        </label>
        <Select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">All Colors</option>
          {colors.map((clr) => (
            <option key={clr} value={clr}>
              {clr}
            </option>
          ))}
        </Select>
      </div>

      {/* Max Price Filter */}
      <div>
        <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
          Max Price (₹)
        </label>
        <Input
          type="number"
          placeholder="e.g., 50000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-wood dark:text-cream mb-2">
          Sort By
        </label>
        <Select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Default</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
