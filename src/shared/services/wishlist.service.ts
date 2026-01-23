import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly wishlistIds = signal<Set<number>>(new Set());
  
  readonly count = signal(0);

  addToWishlist(productId: number): void {
    this.wishlistIds.update(ids => {
      const newIds = new Set(ids);
      newIds.add(productId);
      return newIds;
    });
    this.count.set(this.wishlistIds().size);
  }

  removeFromWishlist(productId: number): void {
    this.wishlistIds.update(ids => {
      const newIds = new Set(ids);
      newIds.delete(productId);
      return newIds;
    });
    this.count.set(this.wishlistIds().size);
  }

  toggleWishlist(productId: number): void {
    if (this.isInWishlist(productId)) {
      this.removeFromWishlist(productId);
    } else {
      this.addToWishlist(productId);
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistIds().has(productId);
  }
}

