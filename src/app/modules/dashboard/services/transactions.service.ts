import { Injectable } from '@angular/core';
import {DashboardModule} from '../dashboard.module';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: DashboardModule
})
export class TransactionsService {

  constructor(private http: HttpClient) { }

  get transactions() {
    return this.http.get(`api/protected/transactions`);
  }

  createTransaction(name: string, amount: number) {
    return this.http.post(`api/protected/transactions`, {name, amount});
  }
}
