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
      {path: 'board/:id', component: BoardComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
