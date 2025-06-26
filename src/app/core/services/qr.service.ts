import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class QRService {
  private baseUrl = environment.qrcodeUrl;  // define baseUrl here

  constructor(private http: HttpClient) {}

  getQRCode(tableId: string) {
    const url = `${this.baseUrl}${encodeURIComponent(tableId)}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
