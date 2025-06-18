import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, options);
  }

  post<T>(endpoint: string, body: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  patch<T>(endpoint: string, body: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.patch<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  delete<T>(endpoint: string, options?: any): Observable<HttpEvent<T>> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, options);
  }
  
  getuser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getUserByRole(role:'ADMIN'|'CASHIER'):Observable<any>{
    return this.http.get(`${this.baseUrl}/users?role=${role}`);
  }

  getUserById(id:number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);  
  }

  updateUser(id: number, userDTO: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/users/${id}`, userDTO);
  }
}
