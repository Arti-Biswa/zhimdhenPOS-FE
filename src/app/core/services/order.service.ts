import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getAllOrders() {
    throw new Error('Method not implemented.');
  }
  markOrderAsCompleted(orderId: number) {
    throw new Error('Method not implemented.');
  }
  private baseUrl = environment.orderUrl; 

  constructor(private http: HttpClient) {}

  placeOrder(order: {
    tableId: string;  // if your backend expects number, consider using number type
    items: { productId: number; quantity: number }[];
  }): Observable<any> {
    return this.http.post(this.baseUrl, order);
  }

  getOrdersByTable(tableId: string | number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/table/${tableId}`);
  }

  getNewOrdersCount(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.baseUrl}/new-count`);
  }

  markOrdersAsViewed(tableId: string | number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/mark-viewed/${tableId}`, {});
  }
  
getLatestOrderByTable(tableNumber: string) {
  return this.http.get<any>(`http://localhost:8080/api/orders/latest/${tableNumber}`);
}

}
