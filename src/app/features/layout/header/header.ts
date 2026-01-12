import { Component, inject, signal, DestroyRef } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductService } from 'shared/services/product.service';
import { WishlistService } from 'shared/services/wishlist.service';
import { CartService } from 'shared/services/cart.service';
import { Product, NAV_ITEMS } from 'shared';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink, ReactiveFormsModule, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);
  readonly wishlistService = inject(WishlistService);
  readonly cartService = inject(CartService);

  readonly navItems = NAV_ITEMS;

  readonly isHoverMenuOpen = signal(false);
  
  readonly isMobileMenuOpen = signal(false);
  readonly isMobileMenuClosing = signal(false);
  readonly shopExpanded = signal(false);
  readonly categoriesExpanded = signal(false);
  readonly featuredExpanded = signal(false);
  readonly collectionsExpanded = signal(false);
  
  readonly isSearchOverlayOpen = signal(false);
  readonly searchQuery = signal('');
  readonly searchResults = signal<Product[]>([]);
  private allProducts = signal<Product[]>([]);

  searchControl = new FormControl('', { nonNullable: true });

  constructor() {
    this.productService.getAllWomen().subscribe(data => {
      this.allProducts.set(data);
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(query => {
        this.searchQuery.set(query);
        this.performSearch(query);
      });
  }

  closeAllOverlays(): void {
    this.closeSearchOverlay();
    this.closeHoverMenu();
  }

  private toggleBodyScroll(): void {
    const hasQuery = !!this.searchQuery();
    const isMobile = window.innerWidth < 768; 
    
    if (hasQuery && isMobile && this.isSearchOverlayOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  openHoverMenu(): void {
    if (!this.isMobileMenuOpen()) {
      this.isHoverMenuOpen.set(true);
    }
  }

  closeHoverMenu(): void {
    this.isHoverMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    if (this.isMobileMenuOpen()) {
      this.isMobileMenuClosing.set(true);
      setTimeout(() => {
        this.isMobileMenuOpen.set(false);
        this.isMobileMenuClosing.set(false);
        this.shopExpanded.set(false);
        this.categoriesExpanded.set(false);
        this.featuredExpanded.set(false);
        this.collectionsExpanded.set(false);
      }, 300); 
    } else {
      this.isMobileMenuOpen.set(true);
      this.isHoverMenuOpen.set(false);
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuClosing.set(true);
    setTimeout(() => {
      this.isMobileMenuOpen.set(false);
      this.isMobileMenuClosing.set(false);
      this.shopExpanded.set(false);
      this.categoriesExpanded.set(false);
      this.featuredExpanded.set(false);
      this.collectionsExpanded.set(false);
    }, 300); 
  }

  toggleShopSection(): void {
    this.shopExpanded.set(!this.shopExpanded());
  }

  toggleCategories(): void {
    this.categoriesExpanded.set(!this.categoriesExpanded());
  }

  toggleFeatured(): void {
    this.featuredExpanded.set(!this.featuredExpanded());
  }

  toggleCollections(): void {
    this.collectionsExpanded.set(!this.collectionsExpanded());
  }

  openSearchOverlay(): void {
    this.isSearchOverlayOpen.set(true);
    this.searchControl.setValue('');
    this.searchResults.set([]);
  }

  closeSearchOverlay(): void {
    this.isSearchOverlayOpen.set(false);
    this.searchControl.setValue('');
    this.searchResults.set([]);
    this.toggleBodyScroll();
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.toggleBodyScroll();
  }

  toggleSearchOverlay(): void {
    if (this.isSearchOverlayOpen()) {
      this.closeSearchOverlay();
    } else {
      this.openSearchOverlay();
    }
  }

  private performSearch(query: string): void {
    const trimmedQuery = query.toLowerCase().trim();
    
    this.toggleBodyScroll();
    
    if (!trimmedQuery) {
      this.searchResults.set([]);
      return;
    }

    const results = this.allProducts().filter(product =>
      product.title.toLowerCase().includes(trimmedQuery)
    );
    
    this.searchResults.set(results);
  }
}
