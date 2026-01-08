import { Component, inject, signal, HostListener } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product.models';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from 'shared/constants/product-options';
import { ProductCard } from 'shared/components/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
})
export class Products {
  private readonly productService = inject(ProductService);
  
  readonly products = signal<Product[]>([]);
  readonly selectedCategory = signal('all');
  readonly isSortDropdownOpen = signal(false);
  readonly selectedSort = signal('featured');
  
  readonly categories = PRODUCT_CATEGORIES;
  readonly sortOptions = SORT_OPTIONS;

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getAllWomen().subscribe(data => {
      this.products.set(data);
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory.set(categoryId);
  }

  toggleSortDropdown(): void {
    this.isSortDropdownOpen.update(v => !v);
  }

 

  selectSort(sortId: string): void {
    this.selectedSort.set(sortId);
    this.isSortDropdownOpen.set(false);
    console.log('Selected sort:', sortId);
  }

  getSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.id === this.selectedSort());
    return option ? option.label : 'Featured';
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.sort-dropdown-container')) {
      this.isSortDropdownOpen.set(false);
    }
  }
}
