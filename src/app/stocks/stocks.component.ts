import { Component, OnInit } from '@angular/core';
interface StockTransaction {
  date: string;
  companyName: string;
  //dematAccount: string;
  type: string;
  price: number;
  shares: number;
  balanceShares: number;
  brokerage: number;
  amount: number;
  marketValue: number;
}

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  transactions: StockTransaction[] = [
    {
      date: '29-Oct-2024',
      companyName: 'Infosys',
     // dematAccount: 'DEMAT1234',
      type: 'Dividend',
      price: 1839.30,
      shares: 0,
      balanceShares: 100,
      brokerage: -2100.00,
      amount: 183930,
      marketValue: 183930
    },
    {
      date: '31-May-2024',
      companyName: 'Mphasis',
     // dematAccount: 'DEMAT1234',
      type: 'Dividend',
      price: 1406.90,
      shares: 0,
      balanceShares: 100,
      brokerage: -800.00,
      amount: 140690,
      marketValue: 140690
    },
    // Add more transactions as needed
  ];

  sort(column: keyof StockTransaction) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.transactions.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' 
          ? valueA - valueB
          : valueB - valueA;
      }

      return 0;
    });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  refreshTransactions() {
    console.log('Refreshing transactions...');
    // Add actual refresh logic here
  }

  exportToExcel() {
    console.log('Exporting to Excel...');
    // Add actual export logic here
  }
}
