import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export interface CustomDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface PriceCalculationParams {
  basePrice: number;
  woodMultiplier: number;
  dimensions?: CustomDimensions;
}

export function calculateCustomPrice(params: PriceCalculationParams): number {
  const { basePrice, woodMultiplier, dimensions } = params;
  
  let price = basePrice * woodMultiplier;
  
  if (dimensions) {
    // Size adjustment: calculate volume factor
    // Base volume (in cubic feet): 3 x 2 x 1.5 = 9 cubic feet
    const baseVolume = 9;
    const actualVolume = (dimensions.width * dimensions.height * dimensions.depth) / (12 * 12 * 12); // Convert inches to feet
    const volumeFactor = actualVolume / baseVolume;
    
    // Add size adjustment (20% of base price per volume factor)
    const sizeAdjustment = basePrice * 0.2 * volumeFactor;
    price += sizeAdjustment;
  }
  
  return Math.round(price);
}

// Wood type multipliers for reference
export const woodMultipliers: Record<string, number> = {
  Teak: 1.5,
  Oak: 1.3,
  Sheesham: 1.0,
  Walnut: 1.4,
};
