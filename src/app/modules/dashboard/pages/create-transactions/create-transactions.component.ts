import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionsService} from '../../services/transactions.service';
import {UsersService} from '../../../../shared/services/users.service';
import {catchError, debounceTime, filter, mergeMap, } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-create-transactions',
  templateUrl: './create-transactions.component.html',
  styleUrls: ['./create-transactions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTransactionsComponent implements OnInit {
  form: FormGroup;
  users$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private transactionsService: TransactionsService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      filter: [null, [Validators.required]],
      amount: [null, [Validators.min(1), Validators.required]]
    });

    this.users$ = this.form.get('filter')
      .valueChanges.pipe(
        debounceTime(300),
        filter(value => typeof value === 'string'),
        mergeMap(value =>
          this.usersService.getRecipientUsers({filter: value})
            .pipe(catchError(err => of([{name: 'User not found', id: null}])))
        )
      );
  }

  displayUser(user) {
    return user ? user.name : undefined;
  }

  createTransaction() {
    if (typeof this.form.value.filter === 'string') {
      this.form.patchValue({filter: null});
      return false;
    }

    const request = this.transactionsService.createTransaction(
      this.form.value.filter.name, this.form.value.filter.amount)
      .subscribe(
        response => {
          console.log(`Уведомление`, response);
        },
        error => {},
        () => request.unsubscribe()
      );
  }

}
