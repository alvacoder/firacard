import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { DashFooterComponent } from './dash-footer/dash-footer.component';
import { BoardComponent } from './board/board.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';


@NgModule({
  declarations: [DashHomeComponent, DashFooterComponent, BoardComponent, DashLayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
