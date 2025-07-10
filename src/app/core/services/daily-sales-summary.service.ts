import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface DailySalesSummary {
  itemName: string;
  quantity: number;
  totalAmount: number;
}

@Injectable({
  providedIn: 'root',
})
export class DailySalesSummaryService {
  private apiUrl = environment.salesSummaryUrl;

  constructor(private http: HttpClient) {}

  // Fetch sales summary by selected date
  getSalesSummaryByDate(date: string): Observable<DailySalesSummary[]> {
    const params = new HttpParams().set('date', date);  // must be 'YYYY-MM-DD'
    return this.http.get<DailySalesSummary[]>(this.apiUrl, { params });
  }
}
