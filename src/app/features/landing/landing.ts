import { Component, signal } from '@angular/core';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {


  // products = signal<Product[]>([]);
  // isLoading = signal(false);
  // productService: any;

  // ngOnInit() {
  //   this.isLoading.set(true);
  //   this.productService.getBags().subscribe(res => {
  //     this.products.set(res.products);
  //     this.isLoading.set(false);
  //   });
  // }

}
