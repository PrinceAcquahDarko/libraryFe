import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of,tap, throwError} from 'rxjs';
import {environment} from "../../environments/environment.prod"
import { ICache } from './interface';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  url = environment.url
  cache: ICache = {}
  constructor(private http: HttpClient) { }

  public getAllBooks(): Observable<any> {
    if(this.cache['allBooks']){
      return of(this.cache['allBooks']) 
    }
    return this.http
      .get<any>(this.url + '/api/v1/book')
      .pipe(
        tap(x => {
          this.cache['allBooks'] = x
        }),
        catchError(this.handleError)
      );
  }

  public getBookById(id:string): Observable<any> {
    return this.http
      .get<any>(this.url + '/api/v1/book/id'+ '?bookId=' + id)
      .pipe(
        catchError(this.handleError)
      );
  }


  public issueBook(id:string): Observable<any> {
    return this.http
      .get<any>(this.url + '/api/v1/issue/book'+ '?bookId=' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  public allIssuedBooks(): Observable<any> {
    return this.http
      .get<any>(this.url + '/api/v1/issue/allbooks')
      .pipe(
        catchError(this.handleError)
      );
  }

  public complain(data:any, id:string): Observable<any> {
    return this.http
      .put<any>(this.url + '/api/v1/issue/complain'+ '?bookId=' + id,data)
      .pipe(
        catchError(this.handleError)
      );
  }

  public returned(data:any, id:string): Observable<any> {
    return this.http
      .put<any>(this.url + '/api/v1/issue/returnbook'+ '?bookId=' + id,data)
      .pipe(
        catchError(this.handleError)
      );
  }

  public deletebook(id:string): Observable<any> {
    return this.http
      .get<any>(this.url + '/api/v1/book/id'+ '?bookId=' + id)
      .pipe(
        catchError(this.handleError)
      );
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
