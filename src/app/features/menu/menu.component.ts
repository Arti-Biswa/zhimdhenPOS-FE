import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  selectedTableId: string | null = null;
  selectedRestaurantId:number|null=null;

  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  selectedCategoryId: number = 0;

  cartItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

 ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.selectedRestaurantId = params['restaurantId'] ? Number(params['restaurantId']) : null;
    this.selectedTableId      = params['tableId']      || null;

    if (!this.selectedRestaurantId) {
      console.error('Restaurant ID is missing');
      return;
    }
    this.loadCategories(this.selectedRestaurantId);
    this.loadProducts(this.selectedRestaurantId);
  });
}

loadCategories(restaurantId: number) {
  this.productService.getCategories(restaurantId).subscribe({
    next: cats => this.categories = cats,
    error: err => console.error('Failed to load categories', err)
  });
}

loadProducts(restaurantId: number) {
  this.productService.getProducts(restaurantId).subscribe({
    next: prods => { this.products = prods; this.filterProducts(); },
    error: err => console.error('Failed to load products', err)
  });
}

  filterProducts(): void {
    const categoryIdNum = Number(this.selectedCategoryId);

    this.filteredProducts = categoryIdNum === 0
      ? this.products
      : this.products.filter(p => p.categoryId === categoryIdNum);
  }

  onSelectCategory(categoryId: any): void {
    this.selectedCategoryId = Number(categoryId);
    this.filterProducts();
  }

  addToCart(product: any): void {
    if (!this.selectedTableId) {
      alert('Please scan QR code from table to order.');
      return;
    }

    const key = `${this.selectedTableId}-${product.id}`;
    const existing = this.cartItems.find(item => item.key === key);

    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({
        ...product,
        quantity: 1,
        tableId: this.selectedTableId,
        key
      });
    }
  }

  increaseQuantity(item: any): void {
    item.quantity += 1;
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.cartItems = this.cartItems.filter(p => p.key !== item.key);
    }
  }

  clearCart(): void {
    this.cartItems = this.cartItems.filter(item => item.tableId !== this.selectedTableId);
  }

  get tableCartItems(): any[] {
    return this.cartItems.filter(item => item.tableId === this.selectedTableId);
  }

  getGrandTotal(): number {
    return this.tableCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  placeOrder(): void {
    if (!this.selectedTableId || this.tableCartItems.length === 0) {
      alert('Select a table and add items before placing an order.');
      return;
    }

    const payload = {
      tableId: this.selectedTableId,
      restaurantId:this.selectedRestaurantId,
      items: this.tableCartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    this.orderService.placeOrder(payload).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.clearCart();
      },
      error: err => {
        console.error('Failed to place order:', err);
        alert('Failed to place order.');
      }
    });
  }
}
