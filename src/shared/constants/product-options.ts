import { Category, ColorOption, SortOption } from 'shared/models/product.models';

export const PRODUCT_CATEGORIES: readonly Category[] = [
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'skirts', label: 'Skirts' },
  { id: 'pants', label: 'Pants & Leggings' },
  { id: 'stretch', label: 'Stretch' },
  { id: 'lounge', label: 'Lounge' }
] as const;

export const PRODUCT_COLORS: readonly ColorOption[] = [
  { name: 'Black', bg: 'bg-black', border: 'border-black' },
  { name: 'Gray', bg: 'bg-gray-500', border: 'border-gray-500' },
  { name: 'Beige', bg: 'bg-[#D4C4B0]', border: 'border-[#D4C4B0]' }
] as const;

export const SORT_OPTIONS: readonly SortOption[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'best-selling', label: 'Best selling' },
  { id: 'price-low-high', label: 'Price, low to high' },
  { id: 'price-high-low', label: 'Price, high to low' }
] as const;

