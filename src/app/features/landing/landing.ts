import { Component, inject, signal } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {

  private productService = inject(ProductService);

  bags = signal<unknown[]>([]);
  dresses = signal<unknown[]>([]);
  shoes = signal<unknown[]>([]);
  watches = signal<unknown[]>([]);
  jewellery = signal<unknown[]>([]);

  constructor() {
    this.loadData();
  }

  loadData() {
    this.productService.getBags().subscribe((res: any) => {
      this.bags.set(res.products);
    });

    this.productService.getDresses().subscribe((res: any) => {
      this.dresses.set(res.products);
    });

    this.productService.getShoes().subscribe((res: any) => {
      this.shoes.set(res.products);
    });

    this.productService.getWatches().subscribe((res: any) => {
      this.watches.set(res.products);
    });

    this.productService.getJewellery().subscribe((res: any) => {
      this.jewellery.set(res.products);
    });
  }
}