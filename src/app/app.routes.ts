import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { HomeComponent } from './features/staff/home/home.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'admin/dashboard',component:DashboardComponent},
    {path:'staff/home',component:HomeComponent}

];
