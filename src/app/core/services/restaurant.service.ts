import { Injectable } from "@angular/core";
import { environment } from "../../../../environment";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService{
    private baseUrl = environment.restUrl;
    
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
}
