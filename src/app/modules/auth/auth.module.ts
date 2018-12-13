import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatFormFieldModule, MatInputModule} from '@angular/material';

@NgModule({
  declarations: [
    SignUpComponent,
    AuthLayoutComponent,
    SignInComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class AuthModule { }
