import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private base = 'https://dummyjson.com/products';

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
}