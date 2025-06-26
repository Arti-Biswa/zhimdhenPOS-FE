import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/admin/dashboard/dashboard.component';
import { HomeComponent } from './features/staff/home/home.component';
import { OrderComponent } from './features/admin/order/order.component';
import { ProductComponent } from './features/admin/product/product.component';
import { ProductFormComponent } from './features/admin/product-form/product-form.component';
import { CategoryComponent } from './features/admin/category/category.component';
import { UpdateFormComponent } from './features/admin/update-form/update-form.component';
import { UserComponent } from './features/admin/user/user.component';
import { UserListComponent } from './features/admin/user-list/user-list.component';
import { UserUpdateComponent } from './features/admin/user-update/user-update.component';
import { MenuComponent } from './features/admin/menu/menu.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AddTableComponent } from './features/admin/add-table/add-table.component';
import { IndexComponent } from './features/super-admin/index/index.component';
import { RestaurantComponent } from './features/super-admin/restaurant/restaurant.component';
import { RestListComponent } from './features/super-admin/rest-list/rest-list.component';
import { EditComponent } from './features/super-admin/edit/edit.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {
  path: 'admin',
  canActivate: [AuthGuard],
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'user-update/:id', component: UserUpdateComponent },
    {path:'dashboard',component:DashboardComponent},
    {path:'product',component:ProductComponent},
    { path: 'product-form', component: ProductFormComponent },
    { path: 'category', component: CategoryComponent }, 
    { path: 'update/:id', component: UpdateFormComponent },
    {path: 'add-table', component: AddTableComponent},
    {path: 'order', component: OrderComponent},
    {path:'menu',component:MenuComponent}

  ]
},
    {path:'staff/home',component:HomeComponent,canActivate:[AuthGuard]},

     {
  path: 'super-admin',
  canActivate: [AuthGuard],
  children: [
    { path: 'index', component: IndexComponent },
    { path: 'restaurant', component: RestaurantComponent},
    {path:'rest-list',component:RestListComponent},
    {path:'edit/:id',component:EditComponent}

  ]
},

];
