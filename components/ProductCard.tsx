import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { Button } from './ui/button';

interface ProductCardProps {
  id: string;
  name: string;
  basePrice: number;
  category: string;
  images: string[];
  stock: number;
}

export default function ProductCard({ id, name, basePrice, category, images, stock }: ProductCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-beige">
          <Image
            src={images[0] || '/placeholder.jpg'}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/product/${id}`}>
              <h3 className="font-semibold text-wood dark:text-cream hover:text-orchid transition-colors line-clamp-1">
                {name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">{category}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-wood dark:text-cream">
            {formatCurrency(basePrice)}
          </div>
          <Link href={`/product/${id}`}>
            <Button size="sm" disabled={stock === 0}>
              {stock === 0 ? 'Out of Stock' : 'View Details'}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
