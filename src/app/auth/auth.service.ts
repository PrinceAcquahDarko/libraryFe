import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment"
import { Ilogin, Iregister } from './interface/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url

  constructor(private http: HttpClient) { }

  public loginUser(data:Ilogin): Observable<any>{
    return this.http.post<Ilogin>(this.url + '/loginStaff', data)
    .pipe(
      catchError(this.handleError)
    )
  }
  public registerUser(data:Iregister): Observable<any>{
    return this.http.post<Iregister>(this.url + '/registerStaff', data)
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(err:HttpErrorResponse){
    let message = '';


    //it seems i changed the arrangement in the erros at the backend side i think i have to turn the
    // super back to the original and see but not now
    if(err.error instanceof ErrorEvent){
      message = `an error occured: ${err.error.message}`
    }
    else{
      message =  err.error 
    }

    return throwError(message)


  }
}
