import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TransactionModel} from '../../../../shared/models/transaction.model';
import {TransactionsService} from '../../services/transactions.service';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsListComponent implements OnInit {
  displayedColumns: string[] = ['date', 'username', 'amount', 'balance', 'controls'];
  transactions: MatTableDataSource<TransactionModel>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionsService: TransactionsService
  ) { }

  ngOnInit() {
    this.transactions = new MatTableDataSource(this.route.snapshot.data.transactions);
    this.transactions.sort = this.sort;
  }

  applyFilter(value) {
    this.transactions.filter = value.trim().toLowerCase();
  }

  repeatTransaction(row) {
    this.transactionsService.repeatedTransaction = row;
    this.router.navigate(['create'], {relativeTo: this.route});
  }
}
