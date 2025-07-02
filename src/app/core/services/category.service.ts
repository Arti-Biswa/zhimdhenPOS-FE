import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private catUrl = environment.categoryUrl;

  constructor(private http: HttpClient) {}

addCategory(category: { name: string }): Observable<any> {
  console.log('Sending category:', category);
  return this.http.post(this.catUrl, category, { observe: 'response' });
}

  getCategories(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.catUrl);
  }

  updateCategory(category: { id: number; name: string }) {
  return this.http.put(`${this.catUrl}/${category.id}`, category);
}

getCategoryById(id: number) {
  return this.http.get<{ id: number; name: string }>(`${this.catUrl}/${id}`);
}

}
