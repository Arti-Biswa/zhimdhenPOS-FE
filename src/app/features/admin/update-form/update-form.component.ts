import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { ProductService } from '../../../core/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [NavbarComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  product: any = {
    name: '',
    price: '',
    categoryId: null,  // Optional if not required
  };

  selectedProduct: any = null;  // Used to identify if updating
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    if (productId) {
      this.loadProduct(+productId);
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductsByRestaurant().subscribe((products) => {
      const found = products.find(p => p.id === id);
      if (found) {
        this.selectedProduct = found;
        this.product = {
          name: found.name,
          price: found.price,
          categoryId: found.categoryId || null
        };

        // Fix: assign full URL or correct data URL for preview
        if (found.image) {
          // Assuming found.image is relative URL like "/uploads/images/xyz.jpg"
          this.imagePreview = 'http://localhost:8080' + found.image; // Adjust domain & port as needed
        } else {
          this.imagePreview = null;
        }
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.imagePreview = null;
      this.selectedFile = null;
      return;
    }

    const file = input.files[0];
    this.selectedFile = file;  // Important to set selectedFile for upload

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;  // base64 string
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('product', JSON.stringify(this.product));

    if (this.selectedFile) {
      formData.append('imageFile', this.selectedFile);
    }

    if (this.selectedProduct?.id) {
      // Update product
      this.productService.updateProduct(this.selectedProduct.id, formData).subscribe({
        next: () => {
          alert('✅ Product updated successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('❌ Update failed', err);
          alert('❌ Update failed');
        },
      });
    } else {
      // Add product
      this.productService.addProduct(formData).subscribe({
        next: () => {
          alert('✅ Product added successfully!');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('❌ Add failed', err);
          alert('❌ Add failed');
        },
      });
    }
  }
}
