import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

 isInventoryDropdownOpen = false;
 isReportDropdownOpen =false;
  isOpen$!: Observable<boolean>;

 constructor (private router:Router, private sidebarService:SidebarService){
   this.isOpen$ = this.sidebarService.open$;

 }
close() {
    this.sidebarService.close();
  }

    onNavigate() {
    // Close sidebar only for small screens
    if (window.innerWidth < 1024) {
      this.sidebarService.close();
    }
  }
  toggleInventoryDropdown(): void {
    this.isInventoryDropdownOpen = !this.isInventoryDropdownOpen;
  }

  toggleReportDropdown():void{
    this.isReportDropdownOpen = !this.isReportDropdownOpen;
  }
onLogout(){
    this.router.navigate(['/']);
  }
}

