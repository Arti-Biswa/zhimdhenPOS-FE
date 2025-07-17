import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Table, TableService } from '../../../core/services/table.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  tableList: Table[] = [];
  newOrdersCountMap: { [tableNumber: string]: number } = {};

  constructor(
    private tableService: TableService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadTables();
    this.loadNewOrdersCount(); // ✅ no restaurantId needed now
  }

  loadTables(): void {
    this.tableService.getTableByRestaurant().subscribe({
      next: (tables) => {
        this.tableList = tables;
      },
      error: (err) => {
        console.error('Error fetching tables:', err);
      }
    });
  }

  loadNewOrdersCount(): void {
    this.orderService.getNewOrdersCount().subscribe({ // ✅ no param
      next: (countMap) => {
        this.newOrdersCountMap = countMap;
      },
      error: (err) => {
        console.error('Error fetching new orders count:', err);
      }
    });
  }
}
