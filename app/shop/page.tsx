import { Suspense } from 'react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

interface SearchParams {
  category?: string;
  wood?: string;
  color?: string;
  maxPrice?: string;
  sort?: string;
}

async function getProducts(params: SearchParams) {
  const { category, wood, color, maxPrice, sort } = params;

  const where: any = {};

  if (category) {
    where.category = category as Category;
  }

  if (maxPrice) {
    where.basePrice = {
      lte: parseFloat(maxPrice),
    };
  }

  // For wood and color, we'll filter client-side for MVP
  // In production, you'd use Prisma relations with some/every

  let orderBy: any = { createdAt: 'desc' };

  if (sort === 'price-asc') {
    orderBy = { basePrice: 'asc' };
  } else if (sort === 'price-desc') {
    orderBy = { basePrice: 'desc' };
  } else if (sort === 'latest') {
    orderBy = { createdAt: 'desc' };
  }

  const products = await prisma.product.findMany({
    where,
    orderBy,
    include: {
      woodTypes: true,
      colors: true,
    },
  });

  // Client-side filter for wood and color (MVP approach)
  let filteredProducts = products;

  if (wood) {
    filteredProducts = filteredProducts.filter((p) =>
      p.woodTypes.some((w) => w.name === wood)
    );
  }

  if (color) {
    filteredProducts = filteredProducts.filter((p) =>
      p.colors.some((c) => c.name === color)
    );
  }

  return filteredProducts;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await getProducts(searchParams);

  return (
    <div className="bg-beige/30 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-wood dark:text-cream mb-2">
            Shop Our Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse our premium furniture collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <FilterSidebar />
            </Suspense>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No products found matching your criteria.
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                  Try adjusting your filters or browse all products.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    basePrice={product.basePrice}
                    category={product.category}
                    images={product.images}
                    stock={product.stock}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
