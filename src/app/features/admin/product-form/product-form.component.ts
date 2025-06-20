import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';


@Component({
  selector: 'app-product',
  imports: [NavbarComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product = { name: '', price: 0, categoryId: 0 };
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  categories: { id: number; name: string }[] = [];
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err: HttpErrorResponse) => console.error('Failed to load categories', err),
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (!this.product.name || !this.product.price || !this.product.categoryId || !this.selectedFile) return;

    const formData = new FormData();
    formData.append('product', JSON.stringify(this.product));
    formData.append('imageFile', this.selectedFile);

    this.productService.addProduct(formData).subscribe({
      next: () => alert('Product added successfully'),
      error: (err: HttpErrorResponse) => {
        console.error(err);
        alert('Failed to add product');
      }
    });
  }
}
