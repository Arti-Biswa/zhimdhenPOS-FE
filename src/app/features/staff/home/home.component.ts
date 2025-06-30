import { Component } from '@angular/core';
import { CashierSideComponent } from '../../../shared/cashier-side/cashier-side.component';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CasherReceiveOrderComponent } from '../casher-receive-order/casher-receive-order.component';



@Component({
  selector: 'app-home',
  imports: [NavbarComponent,CashierSideComponent, CasherReceiveOrderComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
