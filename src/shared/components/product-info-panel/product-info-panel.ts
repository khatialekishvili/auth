import { Component, input, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { Product } from 'shared/models/product.models';
import { PRODUCT_COLORS } from 'shared/constants/product-options';
import { CartService } from 'shared/services/cart.service';
import { WishlistService } from 'shared/services/wishlist.service';

@Component({
  selector: 'app-product-info-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ],
  templateUrl: './product-info-panel.html',
})
export class ProductInfoPanel {
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  readonly product = input.required<Product>();
  readonly showWishlistButton = input<boolean>(true);

  readonly addToCart = output<void>();

  readonly selectedColorIndex = signal(0);
  readonly selectedSizeIndex = signal(0);
  readonly recentlyAddedToCart = signal(false);

  readonly colors = PRODUCT_COLORS;
  readonly sizes = ['XS', 'S', 'M', 'L', 'XL'];

  readonly selectedColor = computed(() => {
    return this.colors[this.selectedColorIndex()];
  });

  readonly selectedSize = computed(() => {
    return this.sizes[this.selectedSizeIndex()];
  });

  selectColor(index: number): void {
    this.selectedColorIndex.set(index);
  }

  selectSize(index: number): void {
    this.selectedSizeIndex.set(index);
  }

  onAddToCart(): void {
    this.addToCart.emit();
    this.recentlyAddedToCart.set(true);
    setTimeout(() => this.recentlyAddedToCart.set(false), 3000);
  }

  onToggleWishlist(): void {
    this.wishlistService.toggleWishlist(this.product().id);
  }

  isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.product().id);
  }
}
