import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {SignUpComponent} from './pages/sign-up/sign-up.component';
import {RecoverPasswordComponent} from './pages/recover-password/recover-password.component';
import {LoginGuard} from '../../shared/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivateChild: [LoginGuard],
    children: [
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'recover',
        component: RecoverPasswordComponent
      },
      {
        path: '',
        redirectTo: 'sign-in'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
