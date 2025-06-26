import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../core/services/sidebar.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-side',
  imports: [CommonModule,RouterModule],
  templateUrl: './admin-side.component.html',
  styleUrl: './admin-side.component.css'
})
export class AdminSideComponent {
    isOpen$!: Observable<boolean>;
  
  constructor(private router:Router,private sidebarService:SidebarService){
    this.isOpen$=this.sidebarService.open$
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
onLogout(){
    this.router.navigate(['/']);
  }
}
