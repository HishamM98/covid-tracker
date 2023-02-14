import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getSummaryData() {
    return this.http.get<any>(`${env.apiUrl}/summary`);
  }

  getCountryDataByDate(country: string, date: string) {
    return this.http.get<any>(
      `${env.apiUrl}/total/country/${country}/status/confirmed?${date}`
    );
  }
}
