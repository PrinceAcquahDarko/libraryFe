import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable,throwError } from 'rxjs';
import {environment} from "../../environments/environment.prod"
import { Iregister } from '../auth/interface/interface';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = environment.url

  constructor(private http: HttpClient) { }

  public uploadBook(data:any): Observable<any>{
    return this.http.post<any>(this.url + '/api/v1/book', data)
    .pipe(
      catchError(this.handleError)
    )
  }

  public updateBook(data:any, id:string): Observable<any>{
    return this.http.put<any>(this.url + '/api/v1/book/id'+ '?bookId=' + id, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  public allIssuedBooks(): Observable<any> {
    return this.http
      .get<any>(this.url + '/api/v1/issue/admin')
      .pipe(
        catchError(this.handleError)
      );
  }

  public adminRegister(data:Iregister): Observable<any>{
    return this.http.post<Iregister>(this.url + '/api/v1/user/register'+ '?admin=' + true, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(err:HttpErrorResponse){
    let message = '';



    if(err.error instanceof ErrorEvent){
      message = `an error occured: ${err.error.message}`
    }
    else{
      message =  err.error 
    }

    return throwError(message)


  }
}
