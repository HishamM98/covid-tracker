import { SearchService } from 'src/app/shared/services/search.service';
import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() covidData: any;
  countries: any[] = [];
  subscription = new Subscription();
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.subscription = this.searchService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

  ngOnChanges(): void {
    this.countries = this.covidData;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
