import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({ providedIn: 'root' })
export class ProductService {

 private pdtUrl = environment.productUrl;
  private catUrl = environment.categoryUrl;    

  constructor(private http: HttpClient) {}

  /* ─────────── CUSTOMER (public) ─────────── */

  /** products shown on QR‑menu */
 getProducts(restaurantId: number): Observable<any[]> {
  const params = new HttpParams().set('restaurantId', restaurantId.toString());   // ← cast to string
  return this.http.get<any[]>(`${this.pdtUrl}/public`, { params });
}

  /** categories shown on QR‑menu */
  getCategories(restaurantId: number): Observable<{ id: number; name: string }[]> {
  const params = new HttpParams().set('restaurantId', restaurantId.toString());   // ← cast to string
  return this.http.get<{ id: number; name: string }[]>(`${this.catUrl}/public`, { params });
}

  /* ─────────── ADMIN CRUD & LIST ─────────── */

  /** list only MY restaurant’s products */
  getProductsByRestaurant(): Observable<any[]> {
    return this.http.get<any[]>(`${this.pdtUrl}/admin-products`);       //  GET /api/products/admin-products
  }

  /** list only MY restaurant’s categories */
  getCategoriesByRestaurant(): Observable<any[]> {
    return this.http.get<any[]>(`${this.catUrl}/by-restaurant`);        //  GET /api/categories/by-restaurant
  }

  /** add product (multipart) */
  addProduct(formData: FormData): Observable<any> {
    return this.http.post(this.pdtUrl, formData);                       //  POST /api/products   (admin only)
  }

  /** update */
  updateProduct(productId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.pdtUrl}/${productId}`, formData);      //  PUT /api/products/{id}
  }

  /** delete */
  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.pdtUrl}/${productId}`, {
      responseType: 'text'
    });                                                                  //  DELETE /api/products/{id}
  }
}
