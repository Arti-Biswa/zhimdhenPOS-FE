import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpEvent } from '@angular/common/http';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { TableService } from '../../../core/services/table.service';
import { QRService } from '../../../core/services/qr.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

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
  qrImage: string | null = null;  
  restaurantId!:number;

  constructor(
    private tableService: TableService,
    private qrService: QRService,
    private toastr:ToastrService,
    private router:Router,
    private route: ActivatedRoute   // add this

  ) {}


  addTable() {
  const trimmedTableNumber = this.tableNumber.trim();

  if (!trimmedTableNumber) {
    this.errorMessage = 'Table number is required.';
    this.qrImage = null;
    return;
  }

  this.errorMessage = '';

  // Call backend to add table
  this.tableService.post<HttpEvent<any>>('/add', { tableNumber: trimmedTableNumber }).subscribe({
    next: () => {
      this.toastr.success('Table added successfully!','Success');
      this.router.navigate(['admin/table-list']);
      this.tableNumber = ''; // reset input

      // Use trimmedTableNumber as string directly since backend expects string
      this.qrService.getQRCode(trimmedTableNumber, this.restaurantId).subscribe({
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
onBack(){
  this.router.navigate(['admin/category-list']);
}
}
