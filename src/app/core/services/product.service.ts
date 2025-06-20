import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private pdtUrl = environment.productUrl;
  private catUrl = environment.categoryUrl;

  constructor(private http: HttpClient) {}

addProduct(formData: FormData): Observable<any> {
  return this.http.post(this.pdtUrl, formData);
}


  getCategories(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.catUrl);
  }

getProducts(): Observable<any[]> {
  return this.http.get<any[]>(this.pdtUrl);
}

updateProduct(productId: number, formData: FormData): Observable<any> {
  return this.http.put(`${this.pdtUrl}/${productId}`, formData);
}
}
