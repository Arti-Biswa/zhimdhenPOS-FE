import { Component } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule,NavbarComponent,SidebarComponent,FormsModule,RouterModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

 users: any[] = [];
  filteredUsers: any[] = [];
  searchQuery = '';
  selectedRole: 'ADMIN' | 'CASHIER' = 'ADMIN'; // default

  constructor(private apiService: ApiService, private router: Router) {
    this.loadUsersByRole(this.selectedRole);
  }

  loadUsersByRole(role: 'ADMIN' | 'CASHIER') {
    this.selectedRole = role;
    this.apiService.getUserByRole(role).subscribe({
      next: (res) => {
        this.users = res.data.users || [];
        this.filterUsers();
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.users = [];
      }
    });
  }

  selectRole(role: 'ADMIN' | 'CASHIER') {
    this.loadUsersByRole(role);
  }

  filterUsers() {
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  createUser(){
    this.router.navigate(['admin/user']);
  }
  
}
