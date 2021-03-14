import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthMainComponent } from './auth-main/auth-main.component';
import { MainModule } from '../main/main.module';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthLayoutComponent, AuthMainComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MainModule
  ]
})
export class AuthModule { }
