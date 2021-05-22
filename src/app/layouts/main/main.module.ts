import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MiscComponent } from './misc/misc.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [HomeComponent, HeaderComponent, MiscComponent, FooterComponent],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports: [HeaderComponent]
})
export class MainModule { }
