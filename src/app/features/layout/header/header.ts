import { Component, inject, signal, viewChild, ElementRef } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { WishlistService } from 'shared/services/wishlist.service';
import { CartService } from 'shared/services/cart.service';
import { Product } from 'shared/models/product.models';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './header.html',
})
export class Header {
  private readonly productService = inject(ProductService);
  readonly wishlistService = inject(WishlistService);
  readonly cartService = inject(CartService);

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
  
  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  constructor() {
    this.productService.getAllWomen().subscribe(data => {
      this.allProducts.set(data);
    });
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
    this.searchQuery.set('');
    this.searchResults.set([]);
    
    setTimeout(() => {
      this.searchInput()?.nativeElement.focus();
    }, 100);
  }

  closeSearchOverlay(): void {
    this.isSearchOverlayOpen.set(false);
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.toggleBodyScroll();
  }

  clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.toggleBodyScroll();
    setTimeout(() => {
      this.searchInput()?.nativeElement.focus();
    }, 0);
  }

  toggleSearchOverlay(): void {
    if (this.isSearchOverlayOpen()) {
      this.closeSearchOverlay();
    } else {
      this.openSearchOverlay();
    }
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.toLowerCase().trim();
    
    this.searchQuery.set(target.value);
    this.toggleBodyScroll();
    
    if (!query) {
      this.searchResults.set([]);
      return;
    }

    const results = this.allProducts().filter(product =>
      product.title.toLowerCase().includes(query)
    );
    
    this.searchResults.set(results);
  }
}
