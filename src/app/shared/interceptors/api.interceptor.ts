import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../services/auth.service';
import {tap} from 'rxjs/operators';
import {NotificationsService} from 'angular2-notifications';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private notification: NotificationsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    let request = req.clone({
      url: `${environment.api}${req.url}`
    });

    if (token) {
      request = request.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`)
      });
    }
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {}, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.notification.error('Error', err.error);
          }
        })
      );
  }
}
