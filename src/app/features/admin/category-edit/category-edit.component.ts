import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-category-edit',
  imports: [CommonModule,FormsModule,RouterModule,NavbarComponent,SidebarComponent],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent implements OnInit {
  categoryId!: number;
  category = { id: 0, name: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.categoryService.getCategoryById(this.categoryId).subscribe(data => {
      this.category = data;
    });
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.category).subscribe(() => {
      this.router.navigate(['/admin/category-list']); 
    });
  }

  onCancel(){
    this.router.navigate(['admin/category-list']);
  }

  onBack(){
    this.router.navigate(['admin/category-list']);
  }
}