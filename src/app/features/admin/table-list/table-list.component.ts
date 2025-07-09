import { Component, OnInit } from '@angular/core';
import { Table, TableService } from '../../../core/services/table.service';
import { QRService } from '../../../core/services/qr.service';
import { OrderService } from '../../../core/services/order.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-table-list',
  imports: [SidebarComponent, NavbarComponent, CommonModule, RouterModule],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent implements OnInit {
  tableList: Table[] = [];
  qrImages: { [key: string]: string } = {};
  newOrdersCountMap: { [tableNumber: string]: number } = {}; // use tableNumber as key

  constructor(
    private tableService: TableService,
    private qrService: QRService,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableService.getTableByRestaurant().subscribe({
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
              console.error('Failed to load QR for table ${table.tableNumber}', error);
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching tables:', err);
      }
    });
  }

   onAdd(){
    this.router.navigate(['admin/add-table'])
   }
  }