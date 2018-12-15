import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';
import {isNullOrUndefined} from 'util';
import {UsersService} from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private router: Router
  ) {}

  private isAuth(): boolean {
    const user = this.userService.getUser().value;
    const token = this.authService.getToken();
    if (!isNullOrUndefined(user) || !isNullOrUndefined(token)) {
      return true;
    }

    this.router.navigate(['auth', 'sign-in']);
    return false;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuth();
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuth();
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuth();
  }
}
