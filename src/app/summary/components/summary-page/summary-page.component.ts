import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css'],
})
export class SummaryPageComponent implements OnInit {
  covidData: any = {};
  countryToSearch!: string;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary() {
    this.dataService.getSummaryData().subscribe({
      next: (data) => {
        this.covidData = data;
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  searchCountry(searchTerm: string) {
    this.countryToSearch = searchTerm;
  }
}
