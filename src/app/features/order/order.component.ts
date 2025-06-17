import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TableService } from '../../core/services/table.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order',
  imports: [SidebarComponent,NavbarComponent,CommonModule,RouterModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {
   tableList: { tableNumber: string }[] = [];

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableService.getAllTables().subscribe({
      next: (tables) => {
        console.log('Tables fetched:', tables); // ✅ should appear in console
        this.tableList = tables;
      },
      error: (err) => {
        console.error('Error fetching tables:', err);
      }
    });
  }
}
