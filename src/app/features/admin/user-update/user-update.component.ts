import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import {FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Role } from '../../../core/model/role.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-update',
  imports: [NavbarComponent,SidebarComponent,CommonModule,FormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {
  userId!: number;

  user: any = null;

  Role = Role;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private toastr:ToastrService
  ) {}

ngOnInit(): void {
  this.userId = Number(this.route.snapshot.paramMap.get('id'));

  this.api.get(`/users/${this.userId}`).subscribe((res: any) => {
    const user = res?.data?.user;

    console.log('User data:', user);

    this.user = {
      username: user?.username || '',
      email: user?.email || '',
      phoneNumber: user?.phoneNumber || '',
      role: user?.role || '',
    };
  });
} 

  onSubmit(): void {
    this.api.updateUser(this.userId, this.user).subscribe(() => {
      this.toastr.success('User Updated Successfully','Success');
      this.router.navigate(['admin/user-list']);
    });
  }

  cancel(): void {
    this.router.navigate(['admin/user-list']);
  }
}
