import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from '@/components/ProductDetailClient';

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      woodTypes: true,
      colors: true,
    },
  });

  return product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
