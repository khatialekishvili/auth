import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'shared/models/product.models';
import { WishlistService } from 'shared/services/wishlist.service';
import { CartService } from 'shared/services/cart.service';
import { PRODUCT_COLORS } from 'shared/constants/product-options';

@Component({
  selector: 'app-product-quick-view',
  imports: [MatDialogModule, MatButtonModule, MatIconModule, NgClass],
  templateUrl: './product-quick-view.html',
})
export class ProductQuickView {
  
  private dialogRef = inject(MatDialogRef<ProductQuickView>);
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);
  
  product = inject<Product>(MAT_DIALOG_DATA);
  
  private _selectedImageIndex = 0;
  selectedColorIndex = 0;
  selectedSize = '';
  
  get selectedImageIndex(): number {
    return this._selectedImageIndex;
  }
  
  set selectedImageIndex(value: number) {
    this._selectedImageIndex = value;
    this.scrollToImage(value);
  }
  
  private scrollToImage(index: number): void {
    setTimeout(() => {
      const element = document.getElementById(`image-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }
  
  colors = PRODUCT_COLORS;
  sizes = ['XS', 'S', 'M', 'L', 'XL'];

  get isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.product.id);
  }

  close(): void {
    this.dialogRef.close();
  }

  toggleWishlist(): void {
    this.wishlistService.toggleWishlist(this.product.id);
  }

  addToBag(): void {
    this.cartService.addToCart(this.product.id, 1);
    this.close();
  }
}

