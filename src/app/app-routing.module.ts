import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManagingComponent } from './managing/managing.component';
import { CartComponent } from './cart/cart.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { OrderViewComponent } from './order-view/order-view.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ViewItemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'managing', component: ManagingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'edit', component: EditItemComponent },
  { path: 'about', component: AboutComponent },
  { path: 'account', component: AccountComponent },
  { path: 'account/details', component: AccountDetailsComponent },
  { path: 'account/:id', component: OrderViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
