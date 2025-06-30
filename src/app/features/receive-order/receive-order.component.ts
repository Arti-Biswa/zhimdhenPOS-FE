import { Component, OnInit } from '@angular/core'; // ✅ ADDED OnInit here
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receive-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receive-order.component.html',
  styleUrl: './receive-order.component.css'
})
export class ReceiveOrderComponent implements OnInit { // ✅ ADDED implements OnInit here

  order: any = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void { // ✅ FIXED: This now works because OnInit is implemented
    const tableNumber = this.route.snapshot.paramMap.get('tableNumber');
    if (tableNumber) {
      this.fetchOrder(tableNumber);
    } else {
      console.error('❌ Table number not found in URL');
    }
  }

 fetchOrder(tableNumber: string): void {
  this.orderService.getLatestOrderByTable(tableNumber).subscribe({
    next: (data) => {
      this.order = {
        ...data,
        totalAmount: data.items.reduce((sum: number, item: any) => {
          return sum + (item.price ?? 0) * item.quantity;
        }, 0),
      };
    },
    error: (err) => {
      console.error('Failed to fetch latest order:', err);
    }
  });
}

}
