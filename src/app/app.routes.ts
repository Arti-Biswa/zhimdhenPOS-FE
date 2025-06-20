import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { HomeComponent } from './features/staff/home/home.component';
import { ProductComponent } from './features/admin/product/product.component';
import { ProductFormComponent } from './features/admin/product-form/product-form.component';
import { CategoryComponent } from './features/admin/category/category.component';
import { UpdateFormComponent } from './features/admin/update-form/update-form.component';
import { AddTableComponent } from './features/add-table/add-table.component';
import { OrderComponent } from './features/order/order.component';
import { UserComponent } from './features/admin/user/user.component';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { UserUpdateComponent } from './features/admin/user-update/user-update.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'admin/dashboard',component:DashboardComponent},
    {path:'staff/home',component:HomeComponent},
    {path:'staff/home',component:HomeComponent},
    {path:'product',component:ProductComponent},
    { path: 'product-form', component: ProductFormComponent },
    { path: 'category', component: CategoryComponent }, 
    { path: 'admin/update/:id', component: UpdateFormComponent },

    {path:'staff/home',component:HomeComponent},
    {path: 'add-table', component: AddTableComponent},
    {path: 'order', component: OrderComponent},
    {path:'admin/user',component:UserComponent},
    {path:'admin/user-list',component:UserListComponent},
    {path:'admin/user-list',component:UserListComponent},
    {path:'admin/user-update/:id',component:UserUpdateComponent}

];
