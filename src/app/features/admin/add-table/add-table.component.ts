import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD:src/app/features/add-table/add-table.component.ts
import { TableService } from '../../core/services/table.service';
import { QRService } from '../../core/services/qr.service';
import { HttpEvent } from '@angular/common/http';
=======
import { HttpEvent } from '@angular/common/http';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { TableService } from '../../../core/services/table.service';
import { ToastrService } from 'ngx-toastr';

>>>>>>> 17cca5cd2f3c02b759b2807c6d6d422de3cc8834:src/app/features/admin/add-table/add-table.component.ts

@Component({
  selector: 'app-add-table',
  standalone: true,
  imports: [FormsModule, SidebarComponent, NavbarComponent, CommonModule],
  templateUrl: './add-table.component.html',
  styleUrls: ['./add-table.component.css']
})
export class AddTableComponent {
  tableNumber: string = '';
  errorMessage: string = '';
  qrImage: string | null = null;  // Holds base64 QR image data

<<<<<<< HEAD:src/app/features/add-table/add-table.component.ts
  constructor(
    private tableService: TableService,
    private qrService: QRService
  ) {}
=======
  constructor(private tableService: TableService,private toastr:ToastrService) {}
>>>>>>> 17cca5cd2f3c02b759b2807c6d6d422de3cc8834:src/app/features/admin/add-table/add-table.component.ts

  addTable() {
  const trimmedTableNumber = this.tableNumber.trim();

<<<<<<< HEAD:src/app/features/add-table/add-table.component.ts
  if (!trimmedTableNumber) {
    this.errorMessage = 'Table number is required.';
    this.qrImage = null;
    return;
=======
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
>>>>>>> 17cca5cd2f3c02b759b2807c6d6d422de3cc8834:src/app/features/admin/add-table/add-table.component.ts
  }

  this.errorMessage = '';

  // Call backend to add table
  this.tableService.post<HttpEvent<any>>('/add', { tableNumber: trimmedTableNumber }).subscribe({
    next: () => {
      alert('Table added successfully!');
      this.tableNumber = ''; // reset input

      // Use trimmedTableNumber as string directly since backend expects string
      this.qrService.getQRCode(trimmedTableNumber).subscribe({
        next: (blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.qrImage = reader.result as string; // base64 image string
          };
          reader.readAsDataURL(blob);
        },
        error: () => {
          console.error('Failed to load QR code.');
          this.qrImage = null;
        }
      });
    },
    error: (err) => {
      console.error('Error adding table:', err);
      alert('Error adding table. It might already exist or you may not have permission.');
      this.qrImage = null;
    }
  });
}
}
