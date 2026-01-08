import { Component, input, inject, signal } from '@angular/core';
import { WishlistService } from 'shared/services/wishlist.service';
import { CartService } from 'shared/services/cart.service';
import { Product } from 'shared/models/product.models';
import { PRODUCT_COLORS } from 'shared/constants/product-options';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly wishlistService = inject(WishlistService);
  readonly cartService = inject(CartService);
  
  readonly product = input.required<Product>();
  readonly recentlyAddedToCart = signal<Set<number>>(new Set());
  readonly selectedColors = signal<Record<number, number>>({});
  
  readonly colors = PRODUCT_COLORS;

  toggleWishlist(productId: number): void {
    this.wishlistService.toggleWishlist(productId);
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1);
    
    this.recentlyAddedToCart.update(set => {
      const newSet = new Set(set);
      newSet.add(productId);
      return newSet;
    });
    
    setTimeout(() => {
      this.recentlyAddedToCart.update(set => {
        const newSet = new Set(set);
        newSet.delete(productId);
        return newSet;
      });
    }, 300);
  }

  isRecentlyAdded(productId: number): boolean {
    return this.recentlyAddedToCart().has(productId);
  }

  selectColor(productId: number, colorIndex: number): void {
    this.selectedColors.update(colors => ({ ...colors, [productId]: colorIndex }));
  }

  getColorIndex(productId: number): number {
    return this.selectedColors()[productId] ?? 0;
  }

  getColorName(productId: number): string {
    return this.colors[this.getColorIndex(productId)].name;
  }
}

