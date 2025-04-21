import { Component, OnInit , HostListener} from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
title ='my portfolio'
  constructor() { }

  ngOnInit(): void {
  }

  activeDropdown: string | null = null;

  toggleDropdown(type: string) {
    this.activeDropdown = this.activeDropdown === type ? null : type;
  }

  // Close dropdowns if clicked outside
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.activeDropdown = null;
    }
  }
}
