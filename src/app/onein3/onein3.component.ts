import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';

interface StockTransaction {
  date: Date;
  symbol: string;
  type: string;
  quantity: number;
  exchange: string;
  price: number;
  amount: number;
}

interface BondTransaction {
  date: Date;
  name: string;
  isin: string;
  type: string;
  price: number;
  units:number;
  InterestRate: number;
  quantity: number;
  faceValue: number;
  amount: number;
}

interface MutualFundTransaction {
  date: Date;
  scheme: string;
  folio: string;
  type: string;
  units: number;
  nav: number;
  amount: number;
}

@Component({
  selector: 'app-onein3',
  templateUrl: './onein3.component.html',
  styleUrls: ['./onein3.component.css']
})
export class Onein3Component implements OnInit {
  // Filter controls
  fromDate: string = '';
  toDate: string = '';
  selectedType: string = 'all';
  searchQuery: string = '';
  
  // Table tabs
  tabs = [
    { id: 'stocks', label: 'Stocks' },
    { id: 'bonds', label: 'Bonds' },
    { id: 'mutual-funds', label: 'Mutual Funds' }
  ];
  activeTab: string = 'stocks';
  
  // Sample data - replace with your actual data
  stocksData: StockTransaction[] = [
    { date: new Date('2023-01-15'), symbol: 'RELIANCE', type: 'Buy', quantity: 10,exchange:'BSE' ,price: 2456.75, amount: 24567.50 },
    { date: new Date('2023-02-20'), symbol: 'TCS', type: 'Buy', quantity: 5, exchange:'BSE' ,price: 3345.60, amount: 16728.00 },
    { date: new Date('2023-03-10'), symbol: 'HDFCBANK', type: 'Sell', quantity: 8, exchange:'BSE' , price: 1520.25, amount: 12162.00 }
  ];
  
  bondsData: BondTransaction[] = [
    { date: new Date('2023-01-05'), name: 'GOVT 7.25% 2033', isin: 'IN0020001234', type: 'Buy', price: 100,units:10, InterestRate: 7.25, quantity: 50, faceValue: 1000, amount: 49250.00 },
    { date: new Date('2023-02-15'), name: 'RELIANCE 8.5% 2028', isin: 'INE002A00025', type: 'Buy', price: 200, units:12, InterestRate: 8.5, quantity: 30, faceValue: 1000, amount: 30750.00 }
  ];
  
  mutualFundsData: MutualFundTransaction[] = [
    { date: new Date('2023-01-10'), scheme: 'Axis Bluechip Fund', folio: 'AXBLU1234', type: 'Purchase', units: 123.456, nav: 45.6789, amount: 5638.00 },
    { date: new Date('2023-03-05'), scheme: 'SBI Small Cap Fund', folio: 'SBISM5678', type: 'Purchase', units: 89.123, nav: 125.4567, amount: 11175.00 }
  ];
  
  // Sorting
  sortColumn: string = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';

  ngOnInit(): void {
    // Initialize with default sorting
    this.applyFilters();
  }

  // Filtered data getters
  get filteredStocks(): StockTransaction[] {
    return this.applyFiltersToData([...this.stocksData], ['symbol', 'type']);
  }

  get filteredBonds(): BondTransaction[] {
    return this.applyFiltersToData([...this.bondsData], ['name', 'isin', 'type']);
  }

  get filteredMutualFunds(): MutualFundTransaction[] {
    return this.applyFiltersToData([...this.mutualFundsData], ['scheme', 'folio', 'type']);
  }

  private applyFiltersToData<T extends { date: Date; type: string }>(data: T[], searchFields: string[]): T[] {
    // Date filter
    if (this.fromDate || this.toDate) {
      const fromDate = this.fromDate ? new Date(this.fromDate) : new Date(0);
      const toDate = this.toDate ? new Date(this.toDate) : new Date();
      data = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }

    // Type filter
    if (this.selectedType !== 'all') {
      data = data.filter(item => item.type.toLowerCase() === this.selectedType);
    }

    // Search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      data = data.filter(item => 
        searchFields.some(field => 
          String((item as any)[field]).toLowerCase().includes(query)
      ));
    }

    // Sorting
    return this.sortData(data);
  }

  private sortData<T>(data: T[]): T[] {
    return data.sort((a, b) => {
      const aValue = (a as any)[this.sortColumn];
      const bValue = (b as any)[this.sortColumn];

      if (typeof aValue === 'string') {
        return this.sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      } else {
        return this.sortDirection === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }
    });
  }

  // Sorting handler
  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortSymbol(column: string): string {
    return this.sortColumn === column 
      ? (this.sortDirection === 'asc' ? '↑' : '↓') 
      : '';
  }

  applyFilters(): void {
    // This forces Angular to recompute the filtered data
    this.filteredStocks;
    this.filteredBonds;
    this.filteredMutualFunds;
  }

  // Helper to format dates consistently
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  bondTransactions = [
    {
      transactionDate: '2025-04-01',
      fixedIncomeName: 'Government Bond 2025',
      transactionType: 'Buy',
      price: 1000,
      units: 5,
      balanceUnits: 5,
      interestRate: 7.5,
      interest: 50,
      amount: 5000
    },
    {
      transactionDate: '2025-04-15',
      fixedIncomeName: 'Corporate Bond X',
      transactionType: 'Buy',
      price: 950,
      units: 10,
      balanceUnits: 15,
      interestRate: 8.2,
      interest: 75,
      amount: 9500
    }
    // Add more dummy records as needed
  ];

  

// ... inside your component class ...

exportStocksToExcel(): void {
  // Prepare the worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
    this.filteredStocks.map(stock => ({
      Date: this.formatDateForExport(stock.date),
      Symbol: stock.symbol,
      Exchange: stock.exchange,
      Type: stock.type,
      Quantity: stock.quantity,
      Price: `₹${stock.price.toFixed(2)}`,
      Amount: `₹${stock.amount.toFixed(2)}`
    }))
  );

  // Set column widths
  ws['!cols'] = [
    { wch: 12 }, // Date
    { wch: 10 }, // Symbol
    { wch: 12 }, // Exchange
    { wch: 10 }, // Type
    { wch: 8 },  // Quantity
    { wch: 10 }, // Price
    { wch: 12 }  // Amount
  ];

  // Create workbook and add worksheet
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Stocks');

  // Generate Excel file and download
  XLSX.writeFile(wb, `Stocks_Transactions_${new Date().toISOString().slice(0,10)}.xlsx`);
}

private formatDateForExport(date: any): string {
  // Convert your date format to a readable Excel date
  const d = new Date(date);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
}