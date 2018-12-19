import { Injectable } from '@angular/core';
import {DashboardModule} from '../dashboard.module';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {TransactionModel} from '../../../shared/models/transaction.model';

@Injectable({
  providedIn: DashboardModule
})
export class TransactionsService {
  repeatedTransaction: TransactionModel = null;

  constructor(private http: HttpClient) { }

  get transactions() {
    return this.http.get(`api/protected/transactions`);
  }

  createTransaction(name: string, amount: number) {
    return this.http.post(`api/protected/transactions`, {name, amount})
      .pipe(map((data: any) => data.trans_token));
  }
}
