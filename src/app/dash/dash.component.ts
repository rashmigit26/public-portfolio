import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

@ViewChild('dropdownTrigger') dropdownTrigger!: ElementRef;
  
isDropdownOpen = false;
selectedPortfolio = { id: 1, name: 'Demo Investments - 1' };

portfolios = [
  { id: 1, name: 'Demo Investments - 1' },
  { id: 2, name: 'Retirement Portfolio' },
  { id: 3, name: 'Tax-Saving Investments' },
  { id: 4, name: 'High-Risk Portfolio' }
];

toggleDropdown(event: MouseEvent) {
  event.stopPropagation();
  this.isDropdownOpen = !this.isDropdownOpen;
}

selectPortfolio(portfolio: any) {
  this.selectedPortfolio = portfolio;
  this.isDropdownOpen = false;
}

@HostListener('document:click', ['$event'])
handleClickOutside(event: MouseEvent) {
  if (!this.dropdownTrigger.nativeElement.contains(event.target)) {
    this.isDropdownOpen = false;
  }
}
}
