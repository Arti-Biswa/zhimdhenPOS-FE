import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.services';
import { Role } from '../../../core/model/role.enum';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  imports: [NavbarComponent,SidebarComponent,CommonModule,FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
user={
  username:'',
  email:'',
  password:'',
  phoneNumber:'',
  role:Role.ADMIN
}
Role=Role;
constructor (private authService:AuthService, private router:Router, private toastr:ToastrService){}

 saveUser(form: NgForm): void {
  console.log('Submit triggered!', form);

  if (form.valid) {
    console.log('Form is valid. Submitting user:', this.user);
    this.authService.signup(this.user).subscribe({
      next: (res) => {
        console.log('User registered successfully:', res);
        this.toastr.success('User created successfully!','Success');
        this.router.navigate(['admin/user-list']);
        form.resetForm();
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
      }
    });
  } else {
    console.warn('Form is invalid!');
  }
}
cancel(){
  this.router.navigate(['admin/user-list']);
}
}
