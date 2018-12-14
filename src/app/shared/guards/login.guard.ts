import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private canActivateHandler() {
    if (!this.authService.getUser()) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivateHandler();
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivateHandler();
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivateHandler();
  }
}
