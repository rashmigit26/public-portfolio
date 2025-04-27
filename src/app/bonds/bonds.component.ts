// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-bonds',
//   templateUrl: './bonds.component.html',
//   styleUrls: ['./bonds.component.css']
// })
// export class BondsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
// bonds.component.ts
// bonds.component.ts
import { Component } from '@angular/core';

interface Bond {
  date: string;
  name: string;
  isin: string;
  type: string;
  couponRate: number;
  quantity: number;
  faceValue: number;
  amount: number;
  currentValue: number;
}

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.css']
})
export class BondsComponent {

  


  sortColumn: string = 'date';
  sortDirection: string = 'asc';
  
  bonds: Bond[] = [
    {
      date: '15-Jan-2023',
      name: 'GOVT 7.25% 2033',
      isin: 'IN0020001234',
      type: 'Purchase',
      couponRate: 7.25,
      quantity: 50,
      faceValue: 1000,
      amount: 49250,
      currentValue: 50750
    },
    {
      date: '20-Feb-2023',
      name: 'RELIANCE 8.5% 2028',
      isin: 'INE002A00025',
      type: 'Purchase',
      couponRate: 8.5,
      quantity: 30,
      faceValue: 1000,
      amount: 30750,
      currentValue: 31500
    },
    {
      date: '05-Mar-2023',
      name: 'MUNICIPAL 7.75% 2026',
      isin: 'INE003B00030',
      type: 'Purchase',
      couponRate: 7.75,
      quantity: 25,
      faceValue: 1000,
      amount: 24875,
      currentValue: 25500
    }
  ];

  get sortedBonds(): Bond[] {
    return [...this.bonds].sort((a, b) => {
      const valA = a[this.sortColumn as keyof Bond];
      const valB = b[this.sortColumn as keyof Bond];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return this.sortDirection === 'asc' 
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return this.sortDirection === 'asc' 
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      }
    });
  }

  sort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  exportToExcel() {
    // Implement your Excel export logic here
    console.log('Exporting to Excel...');
  }
}