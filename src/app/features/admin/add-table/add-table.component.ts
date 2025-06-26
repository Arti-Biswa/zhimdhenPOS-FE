import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpEvent } from '@angular/common/http';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { TableService } from '../../../core/services/table.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-table',
  imports: [FormsModule,SidebarComponent,NavbarComponent,CommonModule],
  templateUrl: './add-table.component.html',
  styleUrl: './add-table.component.css'
})
export class AddTableComponent {
 tableNumber: string = '';
 errorMessage:string='';

  constructor(private tableService: TableService,private toastr:ToastrService) {}

  addTable() {
    const tableData = {
      tableNumber: this.tableNumber
    };

    this.tableService.post<HttpEvent<any>>('/add', tableData).subscribe({
      next: (response) => {
        console.log('Table added:', response);
        this.toastr.success('Table added successfully!','Success');
        this.tableNumber = ''; // reset input
      },
      error: (err) => {
        console.error('Error adding table:', err);
        this.toastr.error('Error adding table. It might already exist or you may not have permission.','Error');
      }
    });
  }
}
