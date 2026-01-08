import { Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core';
import { ProductCard } from 'shared/components/product-card/product-card';
import { Product } from 'shared/models/product.models';

export interface SwiperConfig {
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  pagination?: boolean;
  navigation?: boolean;
  breakpoints?: Record<string, { slidesPerView: number }>;
}

@Component({
  selector: 'app-product-swiper',
  imports: [ProductCard],
  templateUrl: './product-swiper.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductSwiper {
  products = input.required<Product[]>();
  title = input<string>('');
  config = input<SwiperConfig>({
    slidesPerView: 'auto',
    spaceBetween: 20,
    pagination: false,
    navigation: true,
    breakpoints: {
      '768': { slidesPerView: 4 },
      '1024': { slidesPerView: 5 }
    }
  });
  
  productClick = output<Product>();

  get breakpointsJson(): string {
    return JSON.stringify(this.config().breakpoints || {});
  }

  onProductClick(product: Product): void {
    this.productClick.emit(product);
  }
}


