import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Path } from '../structs';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router,private toast:ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if ([401, 403].includes(error.status)) {
          this.router.navigateByUrl(Path.SignIn);
          return throwError(error);
        } else if (error.status === 500) {
          console.error(error);
          this.toast.error(error.message)
          return throwError(error);
        } else {
          this.toast.error(error.message)
          return throwError(error);
        }
      }),
    );
  }
}
