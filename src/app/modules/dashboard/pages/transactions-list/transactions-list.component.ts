import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.data.transactions, 'доделать');
  }

}
