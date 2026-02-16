import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const items = await prisma.compareItem.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            woodTypes: true,
            colors: true,
          },
        },
      },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching compare items:', error);
    return NextResponse.json({ error: 'Failed to fetch compare items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const item = await prisma.compareItem.create({
      data: {
        userId,
        productId,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error adding to compare:', error);
    return NextResponse.json({ error: 'Failed to add to compare' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const itemId = searchParams.get('itemId');

    if (!itemId) {
      return NextResponse.json({ error: 'Missing itemId' }, { status: 400 });
    }

    await prisma.compareItem.delete({
      where: { id: itemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from compare:', error);
    return NextResponse.json({ error: 'Failed to remove from compare' }, { status: 500 });
  }
}
