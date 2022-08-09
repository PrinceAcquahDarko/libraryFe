import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment.prod"
import { Ilogin, Iregister } from './interface/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url

  constructor(private http: HttpClient) { }

  public loginUser(data:Ilogin): Observable<any>{
    return this.http.post<Ilogin>(this.url + '/api/v1/user/login', data)
    .pipe(
      catchError(this.handleError)
    )
  }
  public registerUser(data:Iregister): Observable<any>{
    return this.http.post<Iregister>(this.url + '/api/v1/user/register', data)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getToken(data:any): Observable<any>{
    return this.http.post<Iregister>(this.url + '/api/v1/token', data)
    .pipe(
      catchError(this.handleError)
    )
  }

  public validateToken(data:any, userEmail:string): Observable<any>{
    return this.http.post<Iregister>(this.url + '/api/v1/token/validate' + '?email=' + userEmail, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  public updatePassword(data:any, userEmail:string): Observable<any>{
    return this.http.put<any>(this.url + '/api/v1/token/change-password' + '?email=' + userEmail, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  public updateUser(data:any): Observable<any>{
    return this.http.put<any>(this.url + '/api/v1/user/updateUser', data)
    .pipe(
      catchError(this.handleError)
    )
  }

  public getUser(): Observable<any>{
    return this.http.get<Iregister>(this.url + '/api/v1/user/getUser')
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

