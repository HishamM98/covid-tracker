import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  countries = new Subject();
  constructor() {}

  setCountries(countries: any) {
    this.countries.next(countries);
  }

  getCountries(): Observable<any> {
    return this.countries.asObservable();
  }
}
