import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts/lib/base-chart.directive';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.css'],
})
export class CountryChartComponent implements OnInit, OnChanges, OnDestroy {
  @Input() country!: string;

  barChartData: ChartDataSets[] = [
    {
      data: [],
      label: 'Confirmed Cases',
    },
  ];
  barChartLabels: Label[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.getCountryData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCountryData() {
    if (!this.country) {
      this.country = 'Egypt';
    }
    this.subscription = this.dataService
      .getCountryDataByDate(
        this.country,
        '2020-01-01T00:00:00Z&to=2023-01-01T00:00:00Z'
      )
      .subscribe({
        next: (res) => {
          this.barChartData[0].data = res.map((obj: any) => obj['Cases']);
          this.barChartLabels = res.map((obj: any) =>
            obj['Date'].substring(0, 10)
          );
        },
        error: (err) => {
          alert(err.message);
        },
      });
  }
}
