import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');

    const where: any = {};

    if (category) {
      where.category = category as Category;
    }

    if (maxPrice) {
      where.basePrice = {
        lte: parseFloat(maxPrice),
      };
    }

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

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
