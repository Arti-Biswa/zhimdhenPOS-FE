import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';


@Component({
  selector: 'app-profile-dropdown',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './profile-dropdown.component.html',
  styleUrl: './profile-dropdown.component.css'
})
export class ProfileDropdownComponent {
  
 constructor(private router:Router,private authService:AuthService)
  {}

 onLogOut(){
  this.router.navigate(['/']);
 }

onProfile() {
  this.authService.getCurrentUser().subscribe(user => {
    const role = user?.role;

    if (role === 'ADMIN') {
      this.router.navigate(['/shared/user-profile']);
    } else if (role === 'SUPER_ADMIN') {
      this.router.navigate(['/super-admin/profile']);
    } else if (role === 'CASHIER') {
      this.router.navigate(['/cashier/profile']);
    } else {
      this.router.navigate(['/']);
    }
  });
}

}
