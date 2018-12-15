import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {UserModel} from '../../../../shared/models/user.model';
import {BehaviorSubject} from 'rxjs';
import {UsersService} from '../../../../shared/services/users.service';
import {AuthService} from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent implements OnInit {
  user$: BehaviorSubject<UserModel> = null;

  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.userService.getUser();
  }

  logout() {
    this.authService.logout();
  }
}
