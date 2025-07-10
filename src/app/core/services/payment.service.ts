import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface PaymentRequest {
  orderId: number;
  paymentMethod: string;
  amount: number;
  transferType?: string;
  journalNo?: string;
  remarks?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentUrl = environment.paymentUrl;

  constructor(private http: HttpClient) {}

  submitPayment(payload: PaymentRequest): Observable<any> {
    return this.http.post(`${this.paymentUrl}/submit`, payload);
  }
}
