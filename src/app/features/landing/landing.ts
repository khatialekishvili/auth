import { Component, signal, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'shared/services/product.service';
import { Modal } from 'shared/modals/discount/modal/modal';
import { HoverElevateDirective } from 'shared/directives/hover-elevate.directive';
import { ProductSwiper } from 'shared/components/product-swiper/product-swiper';

@Component({
  selector: 'app-landing',
  imports: [HoverElevateDirective, ProductSwiper],
  templateUrl: './landing.html',
})
export class Landing {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog); 

  products = signal<any[]>([]);
  featured = signal<any[]>([]);
  rest = signal<any[]>([]);

  constructor() {
    this.productService.getAllWomen().subscribe(data => {
      this.products.set(data);
      this.featured.set([data[7], data[12]]);

      this.rest.set(
        data.filter((_: any, i: number) => i !== 7 && i !== 12)
      );
    });
  }

  ngOnInit(): void {
    const alreadySeen = localStorage.getItem('discountUnlocked');
    if (!alreadySeen) {
      this.dialog.open(Modal, {
        panelClass: 'discount-dialog-panel',
        autoFocus: false,
        maxWidth: '960px',
        width: '100%',
      });
    }
  }
}