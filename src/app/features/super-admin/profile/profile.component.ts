import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.services';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],   // (CommonModule is pulled in automatically in `standalone`)
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup; // Declare it without initializing

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: [''],
      phoneNumber: [''],
      email: [''],
      role: ['']
    });

    this.auth.getCurrentUser().subscribe({
      next: user => this.profileForm.patchValue(user),
      error: err => console.error('Failed to load profile', err)
    });
  }

  onBack(): void {
    this.router.navigate(['/super-admin/index']);
  }
}
