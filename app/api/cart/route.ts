import { NextRequest, NextResponse } from 'next/server';

// In-memory cart storage (MVP fallback)
// TODO: Replace with database or localStorage persistence
let cartStorage: any[] = [];

export async function GET() {
  try {
    return NextResponse.json({ items: cartStorage });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { item } = body;

    if (!item) {
      return NextResponse.json({ error: 'Missing item data' }, { status: 400 });
    }

    // Add item to cart
    const existingItemIndex = cartStorage.findIndex((i) => i.id === item.id);

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cartStorage[existingItemIndex].quantity += item.quantity || 1;
    } else {
      // Add new item
      cartStorage.push({
        ...item,
        quantity: item.quantity || 1,
      });
    }

    return NextResponse.json({ success: true, items: cartStorage });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, quantity } = body;

    if (!id || quantity === undefined) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const itemIndex = cartStorage.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    cartStorage[itemIndex].quantity = quantity;

    return NextResponse.json({ success: true, items: cartStorage });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing item id' }, { status: 400 });
    }

    cartStorage = cartStorage.filter((item) => item.id !== id);

    return NextResponse.json({ success: true, items: cartStorage });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
  }
}
