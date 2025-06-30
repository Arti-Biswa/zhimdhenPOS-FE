import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../../core/services/restaurant.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  profileForm!: FormGroup;
  previewUrl: string | null = null;
  restaurantId!: number;
  logoUrl$!: Observable<string>;
  isAdmin:boolean=false;   

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // get /:id from route
    this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

    // build form
    this.profileForm = this.fb.group({
      restaurant_name: [{ value: '', disabled: true }],
      license_no:      [{ value: '', disabled: true }],
      address:         [{ value: '', disabled: true }],
      username:        [{ value: '', disabled: true }],
      email:           [{ value: '', disabled: true }],
      phoneNumber:     [{ value: '', disabled: true }],
      image:           ['']

    });

    // fetch data
    this.restaurantService.getData<any>('/self').subscribe({
      next: res => {
        const r = res.data.restaurant;
        const fullImageUrl = `http://192.168.1.115:8080/${r.image}`; // adjust to match actual base
        this.profileForm.patchValue({
          restaurant_name: r.restaurant_name,
          license_no:      r.license_no,
          address:         r.address,
          username:        r.username,
          email:           r.email,
          phoneNumber:     r.phoneNumber,
          image:           fullImageUrl          
        });
  this.logoUrl$ = of(fullImageUrl);
      
      },
      error: err => console.error('Failed to fetch restaurant', err)
    });
  }

  onBack(): void {
    this.router.navigate(['/admin/user-list']);
  }
}
