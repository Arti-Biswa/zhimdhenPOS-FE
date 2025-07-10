import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, HttpClientModule],
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent {
  paymentMethod: string = '';
  amount: number = 0;
  remarks: string = '';
  transferType: string = '';
  journalNo: string = '';
  totalAmount: number = 0;

  bankOptions = ['Bhutan National Bank', 'Bank of Bhutan', 'Druk PNB', 'T Bank'];
  order: any;

  constructor(private router: Router, private http: HttpClient) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { order?: any };
    this.order = state?.order;
    this.totalAmount = this.order?.totalAmount ?? 0;
  }

  ngOnInit(): void {}

 submitPayment(): void {
  if (!this.order?.id) {
    alert('Order ID is missing. Cannot proceed.');
    return;
  }

  if (!this.paymentMethod) {
    alert('Please select a payment method.');
    return;
  }

  const paymentPayload = {
    orderId: this.order.id,
    paymentMethod: this.paymentMethod,
    amount: this.paymentMethod === 'cash' ? this.totalAmount : Number(this.amount),
    transferType: this.paymentMethod === 'bank' ? this.transferType : null,
    journalNo: this.paymentMethod === 'bank' ? this.journalNo : null,
    remarks: this.remarks || null,
  };

  this.http.post(`${environment.paymentUrl}/submit`, paymentPayload).subscribe({
    next: () => {
      const confirmPrint = window.confirm('Payment successful. Do you want to print the receipt?');
      if (confirmPrint) {
        this.router.navigate(['/payment-receipt'], {
          state: {
            order: this.order,
            paymentMethod: this.paymentMethod,
            transferType: this.transferType,
            amount: paymentPayload.amount,
            journalNo: this.journalNo,
            remarks: this.remarks
          }
        });
      }
    },
    error: (err: HttpErrorResponse) => {
      alert('Payment failed! Please try again.');
      console.error('Payment error:', err);
    }
  });
}
}
