import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { TableService } from '../../core/services/table.service';
import { HttpClient, HttpEvent } from '@angular/common/http';


@Component({
  selector: 'app-add-table',
  imports: [FormsModule,SidebarComponent,NavbarComponent,CommonModule],
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.css'
})
export class AddTableComponent {
 tableNumber: string = '';
 errorMessage:string='';

  constructor(private tableService: TableService) {}

  addTable() {
    const tableData = {
      tableNumber: this.tableNumber
    };

    this.tableService.post<HttpEvent<any>>('/add', tableData).subscribe({
      next: (response) => {
        console.log('Table added:', response);
        alert('Table added successfully!');
        this.tableNumber = ''; // reset input
      },
      error: (err) => {
        console.error('Error adding table:', err);
        alert('Error adding table. It might already exist or you may not have permission.');
      }
    });
  }
}
