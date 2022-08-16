import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { environment } from 'src/environments/environment';
import { ApiMethod } from '../service/apis';
import { HttpService } from '../service/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public httpService: HttpService,
    private httpClient: HttpClient,
    public router: Router
  ) {}
  canActivate(
    routerData: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean | any {
    const expectedRole = routerData.data['expectedRole'];
    let url = `${environment.apiUrl}/${'userinfo'}?`;

    return  this.httpClient
    .get(url)
    .pipe(
      map((res:any): boolean   => {
        if (res.status) {
          if (res.data.role_id) {
            if (res.data.role_id.resource.split(',').includes(expectedRole))
              return true;
            else {
              this.router.navigate(['/home']);
              return false;
            }
          } else {
            this.router.navigate(['/home']);
            return false;
          }
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      }
      ))
  }
}
