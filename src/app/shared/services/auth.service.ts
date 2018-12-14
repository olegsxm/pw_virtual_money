import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpModel} from '../models/sign-up.model';
import {map, mergeMap, tap} from 'rxjs/operators';
import {UserModel} from '../models/user.model';

/**
 *  name: test username
 *  email: testusername9@testusername.testusername
 *  password: testusername
 * */

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LS_KEY_TOKEN = 'token';
  private readonly LS_KEY_USER = 'USER';

  private user: UserModel = this.getUser();
  private token: string = this.getToken();

  constructor(private http: HttpClient) { }

  signUp(data: SignUpModel) {
    return this.http.post('users', data)
      .pipe(
        tap((token: {id_token: string}) => this.setToken(token.id_token)),
        mergeMap(response => this.getUserInfo().pipe(tap((user: UserModel) => this.setUser(user))))
      );
  }

  setToken(token: string): void {
    localStorage.setItem(this.LS_KEY_TOKEN, token);
    this.token = token;
  }
  getToken(): string | null {
    return this.token === null ? localStorage.getItem(this.LS_KEY_TOKEN) : this.token;
  }

  setUser(user: UserModel): void {
    this.user = user;
    localStorage.setItem(this.LS_KEY_USER, JSON.stringify(user));
  }
  getUser(): UserModel | null {
    return this.user === null ? JSON.parse(localStorage.getItem(this.LS_KEY_USER)) : this.token;
  }

  logout(): void {
    localStorage.removeItem(this.LS_KEY_TOKEN);
    localStorage.removeItem(this.LS_KEY_USER);
    this.user = null;
    this.token = null;
  }

  getUserInfo() {
    return this.http.get(`api/protected/user-info`)
      .pipe(
        map((response: {user_info_token: UserModel}) => response.user_info_token),
      );
  }
}
