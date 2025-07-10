import { Component, OnInit } from '@angular/core';
import { DailySalesSummary, DailySalesSummaryService } from '../../core/services/daily-sales-summary.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-daily-sales-summary',
  imports: [CommonModule, FormsModule,FormsModule, NavbarComponent, SidebarComponent],
  templateUrl: './daily-sales-summary.component.html',
  styleUrl: './daily-sales-summary.component.css'
})
export class DailySalesSummaryComponent implements OnInit {
  sales: DailySalesSummary[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0]; // default today
  loading = false;
  error: string | null = null;

  constructor(private salesService: DailySalesSummaryService) {}

  ngOnInit(): void {
    this.fetchSalesSummary();
  }

  fetchSalesSummary(): void {
    this.loading = true;
    this.error = null;
    this.salesService.getSalesSummaryByDate(this.selectedDate).subscribe({
      next: (data) => {
        this.sales = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load sales summary. Please try again.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Called automatically when user changes date input due to (change)="fetchSalesSummary()"
  // Or you can call this explicitly if you want:
  onDateChange(newDate: string): void {
    this.selectedDate = newDate;
    this.fetchSalesSummary();
  }

  get totalQuantity(): number {
    return this.sales.reduce((acc, s) => acc + s.quantity, 0);
  }

  get totalAmount(): number {
    return this.sales.reduce((acc, s) => acc + s.totalAmount, 0);
  }
}
