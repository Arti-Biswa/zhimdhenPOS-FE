import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { CashierSideComponent } from '../../../shared/cashier-side/cashier-side.component';


@Component({
  selector: 'app-home',
  imports: [NavbarComponent,CashierSideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
