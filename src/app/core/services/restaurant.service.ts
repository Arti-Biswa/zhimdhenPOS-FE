import { Injectable } from "@angular/core";
import { environment } from "../../../../environment";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService{
  assetFullPath(image: any): string | null {
    throw new Error('Method not implemented.');
  }
    private baseUrl = environment.restUrl;
      private assetBase = environment.fileBaseUrl;  // base URL for images

     constructor(private http: HttpClient) {}

  post<T>(endpoint: string, body: any, options: any = { observe: 'events', reportProgress: true }): Observable<HttpEvent<T>> {
  return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options);
}

  getData<T>(endpoint: string): Observable<T> {
  return this.http.get<T>(`${this.baseUrl}${endpoint}`);
}

patch(id: number, restaurantDTO: any, imageFile?: File): Observable<any> {
  const formData = new FormData();
  formData.append('restaurant', JSON.stringify(restaurantDTO));

  if (imageFile) {
    formData.append('imageFile', imageFile);
  }

  return this.http.patch(`${this.baseUrl}/${id}`, formData);
}

getLogoUrl() {
  return this.http.get<{ status: boolean; data: { restaurant: { image: string } } }>(`${this.baseUrl}/self`)
    .pipe(
      map(res => this.assetBase + '/' + res.data.restaurant.image)
    );
  }
}
