import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class QRService {
  private baseUrl = environment.qrcodeUrl;  

  constructor(private http: HttpClient) {}

 getQRCode(tableNumber: string, restaurantId: number) {
  const url = `${this.baseUrl}?tableNumber=${encodeURIComponent(tableNumber)}&restaurantId=${restaurantId}`;
  return this.http.get(url, { responseType: 'blob' });
}

}
