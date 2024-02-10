import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './shared/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/auth.service';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { ManagingComponent } from './managing/managing.component';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ItemsService } from './products/items.service';
import { CartComponent } from './cart/cart.component';
import { CartElement } from './cart/cart.element';
import { CartService } from './shared/cart.service';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ViewItemComponent } from './view-item/view-item.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { OrderViewComponent } from './order-view/order-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    ManagingComponent,
    CartComponent,
    EditItemComponent,
    ViewItemComponent,
    AboutComponent,
    AccountComponent,
    AccountDetailsComponent,
    OrderViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    DataService,
    HttpClient,
    AuthService,
    ItemsService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
