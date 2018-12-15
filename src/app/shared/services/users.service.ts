import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {UserModel} from '../models/user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly LS_KEY_USER = 'USER';
  private readonly user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem(this.LS_KEY_USER)));

  constructor(private http: HttpClient) { }

  setUser(user: UserModel): void {
    this.user.next(user);
    localStorage.setItem(this.LS_KEY_USER, JSON.stringify(user));
  }
  getUser(): BehaviorSubject<UserModel> {
    return this.user;
  }

  clearUser() {
    this.user.next(null);
    localStorage.removeItem(this.LS_KEY_USER);
  }

  getUserInfo() {
    return this.http.get(`api/protected/user-info`)
      .pipe(
        map((response: {user_info_token: UserModel}) => response.user_info_token),
      );
  }

  getRecipientUsers(filter: {filter: string}) {
    return this.http.post('api/protected/users/list', filter );
  }
}
