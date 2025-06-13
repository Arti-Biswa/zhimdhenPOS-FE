import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent,SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
