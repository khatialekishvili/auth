import { Component, signal, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Landing {
  private productService = inject(ProductService);

  products = signal<any[]>([]);
  featured = signal<any[]>([]);
  rest = signal<any[]>([]);
  

  constructor() {
  this.productService.getAllWomen().subscribe(data => {
    this.products.set(data);
    this.featured.set([data[7], data[12]]);

    this.rest.set(
      data.filter((item: any, i: number) => i !== 7 && i !== 12)
    );
  });
}
}