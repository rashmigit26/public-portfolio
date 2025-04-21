import { Component, OnInit } from '@angular/core';

interface Transaction {
  date: string;
  schemeName: string;
  folioNo: string;
  type: string;
  price: number;
  units: number;
  balanceUnits: number;
  amount: number;
  marketValue: number;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  transactions: Transaction[] = [
    {
      date: '01-Apr-2015',
      schemeName: 'Axis ELSS Tax Saver Reg-G',
      folioNo: 'FOLD NO.',
      type: 'Investment in fund',
      price: 31.4348,
      units: 3181.188,
      balanceUnits: 3181.188,
      amount: 100000.00,
      marketValue: 100000
    },
    {
      date: '15-Apr-2015',
      schemeName: 'SBI Bluechip Fund',
      folioNo: 'FOLD NO. 2',
      type: 'Dividend',
      price: 45.25,
      units: -500.000,
      balanceUnits: 2681.188,
      amount: 22625.00,
      marketValue: 121312
    },
    {
      date: '10-Mar-2015',
      schemeName: 'HDFC Top 100 Fund',
      folioNo: 'FOLD NO. 3',
      type: 'Purchase',
      price: 28.75,
      units: 1500.500,
      balanceUnits: 4181.688,
      amount: 43125.00,
      marketValue: 120225
    }
  ];

  sort(column: string) {
    // Map the column names to the actual property names in the Transaction interface
    const propertyMap: {[key: string]: keyof Transaction} = {
      'date': 'date',
      'scheme': 'schemeName',
      'type': 'type',
      'price': 'price',
      'units': 'units',
      'balance': 'balanceUnits',
      'amount': 'amount',
      'value': 'marketValue'
    };

    const property = propertyMap[column];
    
    if (!property) return; // Invalid column

    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.transactions.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      // Handle undefined/null values
      if (valueA == null) return 1;
      if (valueB == null) return -1;
      if (valueA == null && valueB == null) return 0;

      // Handle string comparison (for schemeName and type)
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const stringA = valueA.toLowerCase();
        const stringB = valueB.toLowerCase();
        return this.sortDirection === 'asc' 
          ? stringA.localeCompare(stringB)
          : stringB.localeCompare(stringA);
      }
      
      // Handle number comparison (for all numeric fields)
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

  exportToExcel() {
    console.log('Exporting to Excel...');
    alert('Export functionality would be implemented here. For now, check console.');
  }
}
