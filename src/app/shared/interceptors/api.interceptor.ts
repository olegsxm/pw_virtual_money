import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthService} from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

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
    return next.handle(request);
  }
}
