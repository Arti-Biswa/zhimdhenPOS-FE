import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashier-side',
  imports: [CommonModule],
  templateUrl: './cashier-side.component.html',
  styleUrl: './cashier-side.component.css'
})
export class CashierSideComponent {
 isReportDropdownOpen =false;
 constructor(private router:Router){}

   toggleReportDropdown():void{
    this.isReportDropdownOpen = !this.isReportDropdownOpen;
  }

  onLogout(){
    this.router.navigate(['/login']);
  }
}
