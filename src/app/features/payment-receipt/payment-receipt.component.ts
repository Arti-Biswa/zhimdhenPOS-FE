import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-payment-receipt',
  imports: [CommonModule,RouterModule],
  templateUrl: './payment-receipt.component.html',
  styleUrl: './payment-receipt.component.css'
})
export class PaymentReceiptComponent implements OnInit{
 order: any;
  paymentMethod: string = '';
  transferType: string = '';
  amount: number = 0;
  journalNo: string = '';
  remarks: string = '';
  today: Date = new Date();
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state || {};

    this.order = state['order'] || null;
    this.paymentMethod = state['paymentMethod'] || '';
    this.transferType = state['transferType'] || '';
    this.amount = state['amount'] || 0;
    this.journalNo = state['journalNo'] || '';
    this.remarks = state['remarks'] || '';
  }

  ngOnInit(): void {
    setTimeout(() => {
      window.print();
    }, 500);
  }
}