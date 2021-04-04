import { ProfileComponent } from './profile/profile.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { DashLayoutComponent } from './dash-layout/dash-layout.component';
import { BoardComponent } from './board/board.component';
import { DashHomeComponent } from './dash-home/dash-home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DashLayoutComponent,
    children: [
      {path: '', component: DashHomeComponent},
      {path: 'board/:id', component: BoardComponent},
      {path: 'create-card/:id', component: CreateCardComponent},
      {path: 'profile', component: ProfileComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
