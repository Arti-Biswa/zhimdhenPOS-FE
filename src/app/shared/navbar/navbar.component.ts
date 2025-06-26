import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/model/user.model';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.services';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../core/services/user.service';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
currentUser$: Observable<User | null>;
userRole:string='';
isAdmin:boolean=false;
currentUrl:string='';
isSidebarOpen:boolean=false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private userService: UserService,
    private sidebarService:SidebarService

  ) {
    this.currentUser$ = this.authService.getCurrentUser();
  }

ngOnInit(): void {
    const currentUser: User | null = this.userService.getCurrentUser();

    if (currentUser && currentUser.role === 'ADMIN') {
      this.isAdmin = true;
      this.userRole = 'Admin';
    } else if (currentUser?.role === 'CASHIER') {
      this.userRole = 'Cashier';
    }

    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });

    // Initial route assignment
    this.currentUrl = this.router.url;
  }

  goToCashier(): void {
    this.router.navigate(['/staff/home']);
  }

  goToAdminDashboard(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  handleLogout(): void {
    this.authService.logout();
    this.toastr.success('Logout successful', 'Success');
    this.router.navigate(['/login']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  onCashier(){
    this.router.navigate(['staff/home']);
  }

  onMenuClick():void {
  this.sidebarService.toggle();
}
}
