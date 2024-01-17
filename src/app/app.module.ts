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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    ManagingComponent
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
    ItemsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
