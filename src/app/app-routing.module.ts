import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layouts/main/main.module').then(m => m.MainModule)
  },
  {
    path: '',
    loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
  },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
