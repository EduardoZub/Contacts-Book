import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoggedInGuard } from './common/guards/is-logged-in.guard';
import { ModuleAccessGuard } from './common/guards/module-access.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'admin',
    canActivate: [ModuleAccessGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
