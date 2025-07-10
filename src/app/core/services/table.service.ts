import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface Table {
  id: number;
  tableNumber: string;
}

export interface TableDto {
  tableNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private tables: string[] = [];
  private baseUrl = environment.tableUrl;

  constructor(private http: HttpClient) {}

  addTable(table: TableDto): Observable<TableDto> {
    return this.http.post<TableDto>(`${this.baseUrl}/add`, table);
  }

  getTables(): string[] {
    return this.tables;
  }

  post<T>(endpoint: string, body: any, options?: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, options);
  }

  getAllTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.baseUrl}/list`);
  }

 deleteTableById(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}

getTableByRestaurant(){
  return this.http.get<Table[]>(`${this.baseUrl}/by-restaurant`);
}
}