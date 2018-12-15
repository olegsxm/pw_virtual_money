import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignUpModel} from '../models/sign-up.model';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {UserModel} from '../models/user.model';
import {isNullOrUndefined} from 'util';
import {Router} from '@angular/router';
import {BehaviorSubject, MonoTypeOperatorFunction, of} from 'rxjs';
import {UsersService} from './users.service';

/**
 *  name: test username
 *  email: testusername9@testusername.testusername
 *  password: testusername
 **/

function  getUserInfo<T>(context): MonoTypeOperatorFunction<T> {
  return mergeMap(response => context.getUserInfo()
    .pipe(
      tap((user: UserModel) => {
        context.userService.setUser(user);
        context.router.navigateByUrl('');
      }),
      catchError(err => of(err))
    ));
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LS_KEY_TOKEN = 'token';

  private token: string = this.getToken();

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UsersService
  ) {
  }

  setToken(token: string): void {
    localStorage.setItem(this.LS_KEY_TOKEN, token);
    this.token = token;
  }
  getToken(): string | null {
    return isNullOrUndefined(this.token) ? localStorage.getItem(this.LS_KEY_TOKEN) : this.token;
  }
  clearToken() {
    this.token = null;
    localStorage.removeItem(this.LS_KEY_TOKEN);
  }

  getUserInfo() {
    return this.http.get(`api/protected/user-info`)
      .pipe(
        map((response: {user_info_token: UserModel}) => response.user_info_token),
      );
  }

  signUp(data: SignUpModel) {
    return this.http.post('users', data)
      .pipe(
        tap((token: {id_token: string}) => this.setToken(token.id_token)),
        getUserInfo(this)
      );
  }
  signIn(data: {email: string, password: string}) {
    return this.http.post(`sessions/create`, data)
      .pipe(
        tap((token: {id_token: string}) => this.setToken(token.id_token)),
        getUserInfo(this)
      );
  }

  logout(): void {
    this.clearToken();
    this.userService.clearUser();
    this.router.navigateByUrl('auth/sign-in');
  }
}
