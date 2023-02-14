import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps';
import * as WorldMap from '@highcharts/map-collection/custom/world.geo.json';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-live-page',
  templateUrl: './live-page.component.html',
  styleUrls: ['./live-page.component.css'],
})
export class LivePageComponent implements OnInit, OnDestroy {
  liveData: any[] = [];
  subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = 'mapChart';

  chartOptions: Highcharts.Options | any = {
    chart: {
      map: WorldMap,
    },
    title: {
      text: 'COVID-19 World Data',
    },
    subtitle: {
      text: 'Confirmed Cases Live',
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox',
      },
    },
    legend: {
      enabled: true,
    },
    colorAxis: {
      min: 0,
    },
    series: [
      {
        type: 'map',
        name: 'COVID-19 Data',
        states: {
          hover: {
            color: '#dc3545',
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
        },
        allAreas: false,
        data: [],
      },
    ],
  };

  ngOnInit(): void {
    this.dataService.getSummaryData().subscribe({
      next: (data) => {
        this.subscription = this.liveData = data.Countries.map(
          (country: any) => [
            country.CountryCode.toLowerCase(),
            country.TotalConfirmed,
          ]
        );
        this.chartOptions.series[0].data = this.liveData;

        this.Highcharts.mapChart('container', this.chartOptions);
      },
      error: (err) => {
        alert(err.response);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
