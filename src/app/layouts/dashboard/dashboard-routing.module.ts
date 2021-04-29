import { UpgradeBoardComponent } from './board/upgrade-board/upgrade-board.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { BoardComponent } from './board/board.component';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: DashLayoutComponent,
    children: [
      {path: 'dashboard', component: DashHomeComponent, canActivate: [AuthGuard]},
      {path: 'boards/:id', component: BoardComponent},
      {path: 'boards/create-card/:id', component: CreateCardComponent, canActivate: [AuthGuard]},
      {path: 'boards/upgrade/:id', component: UpgradeBoardComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
