import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolygonService {
  private apiKey = '27FzoI96pk1L3ixS815mBPP7glOArbJh'; // 🔑 ใส่ API Key ของคุณ
  private baseUrl = 'https://api.polygon.io/v2/aggs/ticker/'; // 🔑 ใส่ API Key ของคุณ


  constructor(private http: HttpClient) {}

  getStockData(ticker: string, range: number, timespan: string): Observable<any> {
    const url = `${this.baseUrl}${ticker}/range/${range}/${timespan}/2022-01-03/2025-03-02?adjusted=true&sort=asc&apiKey=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  
}
