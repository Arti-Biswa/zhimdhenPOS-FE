import { Component } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-top',
  imports: [],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  constructor(private sidebarService:SidebarService){}
  
  onMenuClick():void {
  this.sidebarService.toggle();
}
}
