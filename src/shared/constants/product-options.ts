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

  { id: 'price-low-high', label: 'Price, low to high' },
  { id: 'price-high-low', label: 'Price, high to low' },
  { id: 'featured', label: 'Featured' }

] as const;



export interface ProductFeature {
  title: string;
  description: string;
}

export const PRODUCT_FEATURES: readonly ProductFeature[] = [
  {
    title: 'Airy & Warm',
    description: 'Lightweight warmth that layers easily across seasons.'
  },
  {
    title: 'Made in Italy',
    description: 'Premium construction, clean finish, elevated handfeel.'
  },
  {
    title: 'Sustainable Blend',
    description: 'Responsible sourcing and long-wear design for less waste.'
  }
] as const;



export interface ProductReview {
  name: string;
  location: string;
  rating: string;
  review: string;
  date: string;
}

export const PRODUCT_REVIEWS: readonly ProductReview[] = [
  {
    name: 'Mira A.',
    location: 'Copenhagen',
    rating: '★★★★★',
    review: 'The fit is perfect and the knit feels really premium. Wore it multiple times already.',
    date: '12/2024'
  },
  {
    name: 'Jules K.',
    location: 'Berlin',
    rating: '★★★★☆',
    review: 'Super soft, slightly oversized. Great for layering.',
    date: '11/2024'
  }
] as const;

export const PRODUCT_ACCORDIONS: readonly AccordionItem[] = [
  {
    title: 'Details & Sustainability',
    content: 'Crafted with premium materials and sustainable practices in mind. This piece is designed to last and become a staple in your wardrobe.',
    contentSize: 'sm'
  },
  {
    title: 'Fit & Sizing',
    content: 'This garment fits true to size. For the best fit, we recommend checking our size chart and considering your preferred fit.',
    contentSize: 'base'
  },
  {
    title: 'Shipping & Returns',
    content: 'Free shipping on orders over $100. Easy returns within 30 days. All items are carefully packaged and shipped within 2-3 business days.',
    contentSize: 'sm'
  }
] as const;


export interface PaginationItem {
  type: 'chevron' | 'page';
  label?: string;
  icon?: string;
  active?: boolean;
}

export const PRODUCT_PAGINATION: readonly PaginationItem[] = [
  { type: 'chevron', icon: 'chevron_left' },
  { type: 'page', label: '1', active: true },
  { type: 'page', label: '2' },
  { type: 'page', label: '3' },
  { type: 'chevron', icon: 'chevron_right' }
] as const;

export interface AccordionItem {
  title: string;
  content: string;
  contentSize?: 'sm' | 'base';
}


