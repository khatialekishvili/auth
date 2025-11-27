import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private base = 'https://dummyjson.com/products';

  getAllProducts() {
    return this.http.get(`${this.base}`);
  }

    getBags() {
        return this.http.get(`${this.base}/category/womens-bags`);
    }

    getDresses() {
        return this.http.get(`${this.base}/category/womens-dresses`);
    }
  
    getShoes() {
        return this.http.get(`${this.base}/category/womens-shoes`);
    }
    getWatches() {
        return this.http.get(`${this.base}/category/womens-watches`);
    }
 
    getJewellery(){
        return this.http.get(`${this.base}/category/womens-jewellery`);
    }

    getAllWomen() {
  return combineLatest([
    this.getBags(),
    this.getDresses(),
    this.getShoes()
  ]).pipe(
    map(([bags, dresses, shoes]: any) => {
      const max = Math.max(
        bags.products.length,
        dresses.products.length,
        shoes.products.length
      );

      const mixed: any[] = [];

      for (let i = 0; i < max; i++) {
        if (bags.products[i]) mixed.push(bags.products[i]);
        if (dresses.products[i]) mixed.push(dresses.products[i]);
        if (shoes.products[i]) mixed.push(shoes.products[i]);
      }

      return mixed;
    })
  );
}
}