import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { Table, TableService } from '../../../core/services/table.service';

@Component({
  selector: 'app-casher-receive-order',
  imports: [CommonModule,  RouterModule],
  templateUrl: './casher-receive-order.component.html',
  styleUrl: './casher-receive-order.component.css'
})
export class CasherReceiveOrderComponent {
tableList: Table[] = [];
  newOrdersCountMap: { [tableNumber: string]: number } = {}; // tableNumber as key

  constructor(
    private tableService: TableService,
    private orderService: OrderService,
    private route: ActivatedRoute
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