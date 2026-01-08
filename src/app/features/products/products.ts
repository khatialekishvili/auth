import { Component, inject, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product.models';
import { PRODUCT_CATEGORIES, SORT_OPTIONS } from 'shared/constants/product-options';
import { ProductCard } from 'shared/components/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard, MatMenuModule],
  templateUrl: './products.html',
})
export class Products {
  private readonly productService = inject(ProductService);
  
  readonly products = signal<Product[]>([]);
  readonly selectedCategory = signal('all');
  readonly selectedSort = signal('featured');
  readonly isMobileSortOpen = signal(false);
  
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

  selectSort(sortId: string): void {
    this.selectedSort.set(sortId);
    this.isMobileSortOpen.set(false);
    console.log('Selected sort:', sortId);
  }

  toggleMobileSort(): void {
    this.isMobileSortOpen.update(v => !v);
  }

  getSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.id === this.selectedSort());
    return option ? option.label : 'Featured';
  }
}
