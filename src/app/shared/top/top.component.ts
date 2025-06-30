import { Component, HostListener } from '@angular/core';
import { SidebarService } from '../../core/services/sidebar.service';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-top',
  imports: [ProfileDropdownComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.css'
})
export class TopComponent {
  showDropdown = false;

  constructor(private sidebarService:SidebarService){}
  
  onMenuClick():void {
  this.sidebarService.toggle();
}
   toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();       // keep the document listener below from closing it immediately
    this.showDropdown = !this.showDropdown;
  }

  /** Click anywhere else closes it */
  @HostListener('document:click')
  closeDropdown(): void {
    if (this.showDropdown) {
      this.showDropdown = false;
    }
  }
}
