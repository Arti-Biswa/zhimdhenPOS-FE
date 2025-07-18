import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';

@Component({
  selector: 'app-product',
  imports: [NavbarComponent, SidebarComponent, CommonModule, FormsModule,  RouterModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']  // <-- corrected here, should be styleUrls
})
export class ProductComponent implements OnInit {
  categories: { id: number; name: string }[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategoryId = 0;
  isLoadingCategories = false;
  isLoadingProducts = false;
  errorMessage = '';
  
  constructor(private productService: ProductService,  private router: Router)  {}

 
  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.isLoadingCategories = true;
    this.productService.getCategoriesByRestaurant().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoadingCategories = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load categories', error);
        this.errorMessage = 'Failed to load categories.';
        this.isLoadingCategories = false;
      }
    });
  }
loadProducts() {
  this.productService.getProductsByRestaurant().subscribe({
    next: (res) => {
      console.log('Products:', res);
      this.products = res;
      this.filteredProducts = res;
    },
    error: (err) => {
      console.error('Error fetching products:', err);
      alert(`Error fetching products: ${err.status} ${err.statusText}`);
    }
  });
}

  filterProducts() {
    const categoryIdNum = +this.selectedCategoryId;

    if (categoryIdNum === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.categoryId === categoryIdNum);
    }
  }

  onUpdate(productId: number) {
  this.router.navigate(['/admin/update', productId]);
  }

  onAddProduct() {
    this.router.navigate(['/admin/product-form']);
  }

onDelete(productId: number): void {
  const confirmDelete = confirm('Are you sure you want to delete this product?');
  if (confirmDelete) {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        // Remove the deleted product from both lists
        this.products = this.products.filter(p => p.id !== productId);
        this.filterProducts(); // Refresh filtered list
        alert('Product deleted successfully.');
      },
      error: (err: HttpErrorResponse) => {
        console.error('Delete failed:', err);
        alert(`Failed to delete product: ${err.message}`);
      }
    });
  }
}

}