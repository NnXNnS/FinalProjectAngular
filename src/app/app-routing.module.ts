import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard  } from './auth/Auth.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  // {
  //   path: 'register',
  //   redirectTo: 'register',
  //   pathMatch: 'full',
  // }, 
  // {
  //   path: 'login',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // }, 
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./layout/layout.module').then((m) => m.LayoutModule),
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'PageNotFound',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}