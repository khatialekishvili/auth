import { Component, input, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WishlistService } from 'shared/services/wishlist.service';
import { CartService } from 'shared/services/cart.service';
import { Product } from 'shared/models/product.models';
import { PRODUCT_COLORS } from 'shared/constants/product-options';
import { ProductQuickView } from 'shared/components/product-quick-view/product-quick-view';

@Component({
  selector: 'app-product-card',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './product-card.html',
})
export class ProductCard {
  private readonly dialog = inject(MatDialog);
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

  openQuickView(): void {
    this.dialog.open(ProductQuickView, {
      data: this.product(),
      panelClass: 'product-quick-view-panel',
      maxWidth: '1000px',
      width: '90vw',
      autoFocus: false,
    });
  }
}

