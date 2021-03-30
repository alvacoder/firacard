import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/layouts/auth/auth.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  token!: string;
  private baseUrl = environment.apiUrl;
  constructor(private authSrv: AuthService) {
    this.authSrv.userTokenSubject.subscribe(res => this.token = res);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
        req = req.clone({
            setHeaders: {Authorization: `Bearer ${this.token}`},
        });
    }
    return next.handle(req);
  }
}
