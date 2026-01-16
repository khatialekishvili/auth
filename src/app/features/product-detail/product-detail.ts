import { Component, inject, signal, computed, OnInit, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductService } from 'shared/services/product.service';
import { CartService } from 'shared/services/cart.service';
import { WishlistService } from 'shared/services/wishlist.service';
import { Product } from 'shared/models/product.models';
import { ProductInfoPanel } from 'shared/components/product-info-panel/product-info-panel';
import { ProductCard } from 'shared/components/product-card/product-card';
import { PRODUCT_FEATURES, PRODUCT_REVIEWS, PRODUCT_PAGINATION, PRODUCT_ACCORDIONS } from 'shared/constants/product-options';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-detail',
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    ProductInfoPanel,
    ProductCard
  ],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);
  readonly cartService = inject(CartService);
  readonly wishlistService = inject(WishlistService);

  readonly product = signal<Product | null>(null);
  readonly loading = signal(true);
  readonly selectedImageIndex = signal(0);
  readonly featuredProducts = signal<Product[]>([]);

  readonly features = PRODUCT_FEATURES;
  readonly reviews = PRODUCT_REVIEWS;
  readonly pagination = PRODUCT_PAGINATION;
  readonly accordions = PRODUCT_ACCORDIONS;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadProduct(id);
        this.loadFeaturedProducts(id);
        window.scrollTo(0, 0);
      }
    });
  }


      private loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data: any) => {
        const product: Product = {
          id: data.id,
          title: data.title,
          price: data.price,
          thumbnail: data.thumbnail,
          images: data.images || [data.thumbnail],
          description: data.description
        };
        this.product.set(product);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/products']);
      }
    });
  }

  private loadFeaturedProducts(currentProductId: number): void {
    this.productService.getAllWomen().subscribe({
      next: (products: any) => {
        const filteredProducts = products
          .filter((p: any) => p.id !== currentProductId);

        const featured = filteredProducts
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        this.featuredProducts.set(featured);
      }
    });
  }

  onAddToCart(): void {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.addToCart(currentProduct.id, 1);
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex.set(index);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

}
