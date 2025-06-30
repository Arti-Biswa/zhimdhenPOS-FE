import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TableService } from '../../../core/services/table.service';
import { QRService } from '../../../core/services/qr.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, CommonModule, RouterModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
 tableList: { tableNumber: string }[] = [];
  qrImages: { [key: string]: string } = {};
  newOrdersCountMap: { [tableNumber: string]: number } = {}; // use tableNumber as key

  constructor(
    private tableService: TableService,
    private qrService: QRService,
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

        this.tableList.forEach(table => {
          this.qrService.getQRCode(table.tableNumber).subscribe({
            next: (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                this.qrImages[table.tableNumber] = reader.result as string;
              };
              reader.readAsDataURL(blob);
            },
            error: (error) => {
              console.error(`Failed to load QR for table ${table.tableNumber}`, error);
            }
          });
        });

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
        // Here we assume backend keys are tableNumbers (strings)
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

  onDeleteTable(tableNumber: string): void {
  if (confirm(`Are you sure you want to delete table ${tableNumber}?`)) {
    this.tableService.deleteTableByNumber(tableNumber).subscribe({
      next: () => {
        alert(`Table ${tableNumber} deleted successfully!`);
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