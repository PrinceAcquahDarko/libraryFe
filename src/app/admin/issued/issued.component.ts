import { Component, OnInit } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-issued',
  templateUrl: './issued.component.html',
  styleUrls: ['./issued.component.css']
})
export class IssuedComponent implements OnInit {
  errormsg!:string
  issuedBooks$ = this._as.allIssuedBooks().pipe(
    map(x => {
      console.log(x);
      return x.books
    }),
    catchError(err => {
      this.errormsg = 'an unexpected error occured please try again later'
      return throwError(err)
    })
    )

    info = {
      complain:''
    }
    
  constructor(private _as: AdminService) { }

  ngOnInit(): void {
  }

  complain(msg:string){
    if(msg){
      this.info.complain = msg
    }else{
      this.info.complain = ''
    }
  }

}
