import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cartItems = signal<Map<number, CartItem>>(new Map());
  
  readonly count = computed(() => {
    let total = 0;
    this.cartItems().forEach(item => total += item.quantity);
    return total;
  });

  addToCart(productId: number, quantity: number = 1): void {
    this.cartItems.update(items => {
      const newItems = new Map(items);
      const existingItem = newItems.get(productId);
      
      if (existingItem) {
        newItems.set(productId, {
          productId,
          quantity: existingItem.quantity + quantity
        });
      } else {
        newItems.set(productId, { productId, quantity });
      }
      
      return newItems;
    });
  }

  removeFromCart(productId: number): void {
    this.cartItems.update(items => {
      const newItems = new Map(items);
      newItems.delete(productId);
      return newItems;
    });
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items => {
      const newItems = new Map(items);
      if (newItems.has(productId)) {
        newItems.set(productId, { productId, quantity });
      }
      return newItems;
    });
  }

  getCartItem(productId: number): CartItem | undefined {
    return this.cartItems().get(productId);
  }

  getQuantity(productId: number): number {
    return this.cartItems().get(productId)?.quantity ?? 0;
  }

  isInCart(productId: number): boolean {
    return this.cartItems().has(productId);
  }

  clearCart(): void {
    this.cartItems.set(new Map());
  }

  getAllItems(): CartItem[] {
    return Array.from(this.cartItems().values());
  }
}

