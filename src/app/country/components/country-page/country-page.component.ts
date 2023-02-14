import { DataService } from './../../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css'],
})
export class CountryPageComponent implements OnInit {
  covidData: any;
  constructor(
    private dataService: DataService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.dataService.getSummaryData().subscribe({
      next: (data) => (this.covidData = data),
      error: (err) => alert(err.message),
    });
  }

  searchCountry(country: any) {
    const countries = this.covidData.Countries.filter((c: any) =>
      c.Country.toLowerCase().includes(country.toLowerCase())
    );
    this.searchService.setCountries(countries);
  }
}
