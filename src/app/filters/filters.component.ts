
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  
  ngOnInit(): void {
  }
  stockTransactions = [
    {
      date: '2024-10-29',
      companyName: 'Infosys',
      type: 'Buy',
      price: 1839.3,
      shares: 10,
      brokerage: 20,
      amount: 18393,
      marketValue: 19000
    },
    {
      date: '2024-11-05',
      companyName: 'TCS',
      type: 'Sell',
      price: 3500,
      shares: -5,
      brokerage: 10,
      amount: -17500,
      marketValue: 0
    }
  ];
}
