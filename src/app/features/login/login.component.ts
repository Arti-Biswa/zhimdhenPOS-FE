import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.services';
import { LoginModel } from '../../core/model/login.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule,CommonModule,ToastrModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm: FormGroup;
submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr:ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required,
      ]]
    }, { 
    });
  }

  ngOnInit(): void {
  this.authService.logout();
  }

onSubmit(): void {
  this.submitted = true;

  if (this.loginForm.invalid) return;

  const loginData: LoginModel = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  };

  this.authService.login(loginData).subscribe({
    next: (response) => {
      if (response?.accessToken && response?.refreshToken) {
        // 💡 Ensure token is set before calling user endpoint
        this.authService.setToken(response.accessToken);
        this.authService.setRefreshToken(response.refreshToken);

        // ✅ Fetch current user with valid token now in storage
        this.authService.getCurrentUser().subscribe({
          next: (user) => {
            const role = user.role.toLowerCase();

            if (role === 'admin') {
              this.router.navigate(['admin/dashboard']);

            } else if (role === 'cashier') {
              this.router.navigate(['staff/home']);
              
            } else {
              this.toastr.warning('Unknown role');
              this.router.navigate(['/']);
            }
          },
          error: () => {
            this.toastr.error('Failed to fetch user info');
            this.authService.logout();
          }
        });

        this.toastr.success('Login successful', 'Success');
      } else {
        this.toastr.error('No token received', 'Error');
      }
    },
    error: (data) => {
      this.toastr.error(data.error?.message || 'Login failed', 'Error');
    }
  });
}

// Getter for easy access to form fields
get f() {
  return this.loginForm.controls;
}
}
