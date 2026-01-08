export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
}

export interface Category {
  id: string;
  label: string;
}

export interface ColorOption {
  name: string;
  bg: string;
  border: string;
}

export interface SortOption {
  id: string;
  label: string;
}

