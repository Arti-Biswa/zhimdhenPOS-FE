import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Table, TableService } from '../../../core/services/table.service';
import { QRService } from '../../../core/services/qr.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent{
   tableList: Table[] = [];
  newOrdersCountMap: { [tableNumber: string]: number } = {}; // tableNumber as key

  constructor(
    private tableService: TableService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableService.getAllTables().subscribe({
      next: (tables) => {
        this.tableList = tables;
        this.loadNewOrdersCount();
      },
      error: (err) => {
        console.error('Error fetching tables:', err);
      }
    });
  }

  loadNewOrdersCount(): void {
    this.orderService.getNewOrdersCount().subscribe({
      next: (countMap) => {
        this.newOrdersCountMap = countMap;
      },
      error: (err) => {
        console.error('Error fetching new orders count:', err);
      }
    });
  }

  markAsViewed(tableNumber: string): void {
    this.orderService.markOrdersAsViewed(tableNumber).subscribe({
      next: () => {
        this.newOrdersCountMap[tableNumber] = 0;
      },
      error: (err) => {
        console.error(`Error marking orders as viewed for table ${tableNumber}:`, err);
      }
    });
  }

}