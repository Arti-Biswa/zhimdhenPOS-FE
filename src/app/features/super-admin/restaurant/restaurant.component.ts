import { Component } from '@angular/core';
import { AdminSideComponent } from '../../../shared/admin-side/admin-side.component';
import { TopComponent } from '../../../shared/top/top.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RestaurantService } from '../../../core/services/restaurant.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  imports: [AdminSideComponent,TopComponent,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})
export class RestaurantComponent {
 restaurantForm: FormGroup;
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private restaurantService: RestaurantService,
    private toastr: ToastrService,
    private router:Router
  ) {
    this.restaurantForm = this.fb.group({
      restaurant_name: ['', Validators.required],
      license_no: ['', Validators.required],
      address: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      image: [null]
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  onSubmit(): void {
  if (this.restaurantForm.invalid) {
    this.toastr.warning('Please fill in all required fields.');
    return;
  }

  const formData = new FormData();
  formData.append('restaurant', JSON.stringify(this.restaurantForm.value));

  if (this.selectedImage) {
    formData.append('imageFile', this.selectedImage);
  }

// reactive-form example
this.restaurantService.post('/add', formData).subscribe({
  next: () => {
    this.toastr.success('Restaurant registered successfully!');

    // 1️⃣ clear every control in the form
    this.restaurantForm.reset();       // <-- or whatever your FormGroup variable is

    // 2️⃣ go back to the list
    this.router.navigate(['/super-admin/rest-list']);
  },

  error: err => this.toastr.error('Registration failed: ' + (err.error?.message || err.message))
});

}
onBack(){
  this.router.navigate(['super-admin/rest-list'])
}
}
