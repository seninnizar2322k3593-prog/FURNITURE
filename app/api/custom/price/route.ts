import { NextRequest, NextResponse } from 'next/server';
import { calculateCustomPrice } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { basePrice, woodMultiplier, dimensions } = body;

    if (!basePrice || !woodMultiplier) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const price = calculateCustomPrice({
      basePrice,
      woodMultiplier,
      dimensions,
    });

    return NextResponse.json({ price });
  } catch (error) {
    console.error('Error calculating price:', error);
    return NextResponse.json({ error: 'Failed to calculate price' }, { status: 500 });
  }
}
