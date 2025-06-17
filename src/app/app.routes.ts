import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { HomeComponent } from './features/staff/home/home.component';
import { AddTableComponent } from './features/add-table/add-table.component';
import { OrderComponent } from './features/order/order.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'admin/dashboard',component:DashboardComponent},
    {path:'staff/home',component:HomeComponent},
    {path: 'add-table', component: AddTableComponent},
    {path: 'order', component: OrderComponent}

];
