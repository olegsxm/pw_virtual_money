import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { TransactionsListComponent } from './pages/transactions-list/transactions-list.component';
import { CreateTransactionsComponent } from './pages/create-transactions/create-transactions.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';

@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardHeaderComponent,
    DashboardNavComponent,
    TransactionsListComponent,
    CreateTransactionsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class DashboardModule { }
