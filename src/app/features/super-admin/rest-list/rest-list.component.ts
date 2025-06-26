import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopComponent } from '../../../shared/top/top.component';
import { AdminSideComponent } from '../../../shared/admin-side/admin-side.component';
import { RestaurantService } from '../../../core/services/restaurant.service';

@Component({
  selector: 'app-rest-list',
  standalone: true,
  imports: [TopComponent, AdminSideComponent, CommonModule, FormsModule, RouterModule,ReactiveFormsModule],
  templateUrl: './rest-list.component.html',
  styleUrls: ['./rest-list.component.css']
})
export class RestListComponent implements OnInit {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchQuery = '';

  constructor(private router: Router, private restaurantService: RestaurantService) {}
  
ngOnInit(): void {
  this.restaurantService.getData<any>('').subscribe((data) => {
    console.log('API response:', data); // 👈 Add this

    this.restaurants = data.data.restaurants;
    this.filteredRestaurants = [...this.restaurants];
  });
}

  filterRestaurants(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(r =>
      r.restaurant_name.toLowerCase().includes(query)
    );
  }

  createAdmin(): void {
    this.router.navigate(['super-admin/restaurant']);
  }

onUpdate(id: number) {
  if (!id) {
    console.error('Invalid restaurant ID:', id);
    return;
  }
  this.router.navigate(['super-admin/edit', id]);
}

}
