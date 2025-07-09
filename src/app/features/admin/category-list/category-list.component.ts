import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { Category, CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  imports: [NavbarComponent,SidebarComponent,CommonModule,RouterModule,FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  filteredCategory: Category[] = [];
  searchQuery = '';

  constructor(private categoryService: CategoryService, private router:Router) {}

  ngOnInit(): void {
    this.loadCategories();   
  }

  private loadCategories(): void {
    this.categoryService.getCategoryByRestaurant().subscribe(data => {
      this.categories = data;
      this.filteredCategory = data;       
    });
  }

  filterCategory(): void {
    const q = this.searchQuery.trim().toLowerCase();
    this.filteredCategory = q
      ? this.categories.filter(c => c.name.toLowerCase().includes(q))
      : this.categories;
  }

   createCategory(){
    this.router.navigate(['admin/category']);
  }

  onEdit(categoryId: number): void {
  // absolute path: /admin/category-update/:id
  this.router.navigate(['/admin/category-edit', categoryId]);
}
}
