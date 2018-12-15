import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';
import {AuthGuard} from '../../shared/guards/auth.guard';
import {TransactionsListComponent} from './pages/transactions-list/transactions-list.component';
import {TransactionsListResolver} from './services/transactions-list.resolver';
import {CreateTransactionsComponent} from './pages/create-transactions/create-transactions.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: TransactionsListComponent,
        resolve: {
          transactions: TransactionsListResolver
        }
      },
      {
        path: 'create',
        component: CreateTransactionsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
