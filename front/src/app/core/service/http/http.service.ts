import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { ApiEndPoints, ApiMethod } from '../apis';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  response!: Observable<any>;

  constructor(private http: HttpClient) {}

  downloadFile(fileSRC:any): any {
		return this.http.get(fileSRC, {responseType: 'blob'});
  }

  call(
    endPoint: ApiEndPoints | string,
    method: ApiMethod,
    params?: any | undefined,
    data?: any
  ): Observable<any> {
    let url = `${environment.apiUrl}/${endPoint}?`;
    params = params === undefined ? new Object() : params;
    
    Object.entries(params).forEach((item) => {
      const [key, value]: any = item;
      url = url+= key +"="+value +'&'
      // if (url.indexOf(`{{${key}}}`) !== -1) {
      //   url = url.split(`{{${key}}}`).join(value);
      // }
    });
    let options = {};
    if (data !== undefined && method === ApiMethod.DELETE) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {
          ...data,
        },
      };
    }

    switch (method) {
      case ApiMethod.GET:
        this.response = this.http
          .get(url)
          .pipe(catchError((err) => this.handleError(err, this)));
        break;
      case ApiMethod.POST:
        this.response = this.http
          .post(url, data)
          .pipe(catchError((err) => this.handleError(err, this)));
        break;
      case ApiMethod.PUT:
        this.response = this.http
          .put(url, data)
          .pipe(catchError((err) => this.handleError(err, this)));
        break;
      case ApiMethod.DELETE:
        this.response = this.http
          .delete(url)
          .pipe(catchError((err) => this.handleError(err, this)));
        break;
      default:
        break;
    }
    return this.response;
  }

  /**
   * this function is used to handle errors
   * //@param error
   */
  // @ts-ignore
  handleError(error: HttpResponse<any>, self: any): ObservableInput<any> {
    // @ts-ignore
    if (error.error instanceof ErrorEvent) {
      // @ts-ignore
      console.log('Something went wrong: ', error.error.message);
    } else {
      return throwError({
        // @ts-ignore
        error: error.message,
        status: error.status,
      });
    }
  }
}
