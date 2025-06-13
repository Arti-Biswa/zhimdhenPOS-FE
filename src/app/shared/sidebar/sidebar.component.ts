import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

 isInventoryDropdownOpen = false;
 isReportDropdownOpen =false;

  toggleInventoryDropdown(): void {
    this.isInventoryDropdownOpen = !this.isInventoryDropdownOpen;
  }

  toggleReportDropdown():void{
    this.isReportDropdownOpen = !this.isReportDropdownOpen;
  }
}

