import { ToastrService } from 'ngx-toastr';

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/layouts/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authSrv: AuthService,
        private toastr: ToastrService,
        private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (this.bypassErrInterceptor(request)) {
                return throwError(err);
            }
            switch (err.status) {
                case 401:
                    this.authSrv.logout();
                    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url }}).finally(() => {
                        window.location.reload();
                        this.toastr.warning('Session timeout, please login');
                    });
                    break;
                default:
                    return throwError(err);
            }
            const error = err;
            return throwError(error);
        }));
    }

    bypassErrInterceptor(request: HttpRequest<any>): any {
        return request.url.search('/login') !== -1 || request.url.search('/reset-password') !== -1;
    }
}
