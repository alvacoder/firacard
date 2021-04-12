import { SharedModule } from './../../shared/shared.module';
import { BoardService } from './services/board.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { DashFooterComponent } from './dash-footer/dash-footer.component';
import { BoardComponent } from './board/board.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardSettingsComponent } from './board/board-settings/board-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateBoardComponent } from './board/create-board/create-board.component';


@NgModule({
  declarations: [
    DashHomeComponent, DashFooterComponent, BoardComponent, DashLayoutComponent,
    CreateCardComponent, BoardSettingsComponent, ProfileComponent, CreateBoardComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [BoardService]
})
export class DashboardModule { }
