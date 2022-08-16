import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getItem, removeItem, StorageItem } from '../../core/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/core/service/http/http.service';
import { ApiEndPoints, ApiMethod } from 'src/app/core/service/apis';
import { Router } from '@angular/router';
import { Path } from 'src/app/core/structs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(!!getItem(StorageItem.Auth));
  private apiBaseUrl = `${environment.apiUrl}`;

  constructor(private httpService: HttpService,private http: HttpClient,private router:Router) {
    this.checkToken();
  }

  get isLoggedIn(): boolean {
    return this.isLoggedIn$.getValue();
  }

  public set value(v: boolean) {
    this.isLoggedIn$.next(v);
  }

  checkToken() {
    this.httpService
    .call( ApiEndPoints.Check , ApiMethod.GET )
    .subscribe((res:any) => {
        if(!res.success){
          this.router.navigate([`/${Path.SignIn}`]);
        }
    },()=>{
      this.router.navigate([`/${Path.SignIn}`]);
    }); 
  }

  signIn(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/login`, payload);
  }

  signOut(): void {
    removeItem(StorageItem.Auth);
    this.isLoggedIn$.next(false);
  }
}
