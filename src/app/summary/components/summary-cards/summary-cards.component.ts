import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.css'],
})
export class SummaryCardsComponent implements OnInit {
  @Input() covidData: any;

  constructor() {}

  ngOnInit(): void {}
}
