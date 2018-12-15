import {Injectable} from '@angular/core';
import {DashboardModule} from '../dashboard.module';
import {Resolve} from '@angular/router';
import {TransactionsService} from './transactions.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: DashboardModule
})
export class TransactionsListResolver implements Resolve<any> {

  constructor(private transactionsService: TransactionsService) {}

  resolve(): Observable<any> | Promise<any> | any {
    return this.transactionsService.transactions
      .pipe(
        map((response: {trans_token: any[]}) => response.trans_token),
      );
  }
}
