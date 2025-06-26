import { Component, OnInit } from '@angular/core';
import { TopComponent } from '../../../shared/top/top.component';
import { AdminSideComponent } from '../../../shared/admin-side/admin-side.component';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [TopComponent,AdminSideComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  restaurantForm!: FormGroup;
  imageFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  restaurantId!: number;
  selectedImage!: File;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.restaurantId = +this.route.snapshot.paramMap.get('id')!;

  // Initialize the form first
  this.restaurantForm = this.fb.group({
    restaurant_name: [''],
    license_no: [''],
    address: [''],
    username: [''],
    email: [''],
    phoneNumber: ['']
  });

  // Fetch restaurant data from backend
  this.restaurantService.getData<any>(`/${this.restaurantId}`).subscribe({
    next: (res) => {
      const restaurant = res.data.restaurant;

      // Patch form values with restaurant data
      this.restaurantForm.patchValue({
        restaurant_name: restaurant.restaurant_name,
        license_no: restaurant.license_no,
        address: restaurant.address,
        username: restaurant.username,
        email: restaurant.email,
        phoneNumber: restaurant.phoneNumber
      });

      // Optional: If you want to display the existing image
      if (restaurant.imageUrl) {
        this.previewUrl = restaurant.imageUrl; // Set to image URL if available
      }
    },
    error: (err) => console.error('Failed to fetch restaurant', err)
  });
}


  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    const restaurantData = this.restaurantForm.value;

    formData.append('restaurant', new Blob([JSON.stringify(restaurantData)], { type: 'application/json' }));
    if (this.imageFile) {
      formData.append('imageFile', this.imageFile);
    }

this.restaurantService.patch(this.restaurantId, this.restaurantForm.value, this.selectedImage)
  .subscribe({
    next: (res) => {
      console.log('Restaurant updated:', res);
    },
    error: (err) => {
      console.error('Update failed:', err);
    }
  });

  }

  onBack(): void {
    this.router.navigate(['/super-admin/rest-list']);
  }
}
