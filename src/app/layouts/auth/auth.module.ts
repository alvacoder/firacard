import { environment } from './../../../environments/environment';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AuthMainComponent } from './auth-main/auth-main.component';
import { MainModule } from '../main/main.module';

import { AuthServiceConfig, SocialLoginModule,  } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.google.clientId)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebook.appId)
  },
]);
export const provideConfig = () => {
  return config;
};


@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthLayoutComponent, AuthMainComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MainModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class AuthModule { }
