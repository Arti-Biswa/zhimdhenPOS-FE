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

  onDeleteTable(id: number): void {
  if (confirm(`Are you sure you want to delete table ID ${id}?`)) {
    this.tableService.deleteTableById(id).subscribe({
      next: () => {
        alert(`Table ID ${id} deleted successfully!`);
        this.loadTables();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete table!');
      }
    });
    }
  }
}