import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CategoryService } from '../../../core/services/category.service';


@Component({
  selector: 'app-category',
  imports: [NavbarComponent, SidebarComponent, CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']  // fixed here
})
export class CategoryComponent implements OnInit {
  newCategoryName = '';
  categories: { id: number; name: string }[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Failed to load categories', err),
    });
  }

  onAddCategory() {
    if (!this.newCategoryName.trim()) return;

    const newCategory = { name: this.newCategoryName.trim() };

    this.categoryService.addCategory(newCategory).subscribe({
      next: () => {
        alert('Category added successfully');
        this.newCategoryName = '';
        this.loadCategories(); // reload list
      },
      error: (err) => {
        console.error('Failed to add category:', err);
        alert('Failed to add category');
      },
    });
  }
}