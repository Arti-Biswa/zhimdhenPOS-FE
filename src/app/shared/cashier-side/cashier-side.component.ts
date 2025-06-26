import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cashier-side',
  imports: [CommonModule],
  templateUrl: './cashier-side.component.html',
  styleUrl: './cashier-side.component.css'
})
export class CashierSideComponent {
 isReportDropdownOpen =false;
  isOpen$!: Observable<boolean>;

 constructor(private router:Router,private sidebarService:SidebarService){
  this.isOpen$=this.sidebarService.open$;
 }
  
 closeSidebar() {
    this.sidebarService.close();
  }

    onNavigate() {
    // Close sidebar only for small screens
    if (window.innerWidth < 1024) {
      this.sidebarService.close();
    }
  }
   toggleReportDropdown():void{
    this.isReportDropdownOpen = !this.isReportDropdownOpen;
  }

  onLogout(){
    this.router.navigate(['/login']);
  }
}
