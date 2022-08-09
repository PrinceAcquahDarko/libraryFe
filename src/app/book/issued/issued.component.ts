import { Component, OnInit } from '@angular/core';
import { catchError, map, merge, Subject, throwError, scan } from 'rxjs';
import { BookService } from '../book.service';

@Component({
  selector: 'app-issued',
  templateUrl: './issued.component.html',
  styleUrls: ['./issued.component.css']
})
export class IssuedComponent implements OnInit {
  errormsg!:string;
  complainmsg = 'enter complain'
  bookId!:string

  private insertedbook = new Subject<any>()
  insertedBookAction$ = this.insertedbook.asObservable()

  issuedBooks$ = this._bs.allIssuedBooks().pipe(
    map(x => {
      console.log(x, 'from x');
      let bk = x.books.filter((x: { returned: boolean; }) => x.returned === false) 
      return bk
    })
  );

  bookwithAdds$ = merge(
    this.issuedBooks$,
    this.insertedBookAction$
  ).pipe(
    scan((books, book) => this.modifyProducts(books, book)),
    catchError(err => {
      console.log(err)
      this.errormsg = 'an unexpected error occured please try again later'
      return throwError(err)
    })
   
  )

  info = {
    complain:''
  }
  returnedbook = {
    returned: true
  }

  constructor(private _bs:BookService) { }


  ngOnInit(): void {
  }

  modifyProducts(books: any, book:any): any{
    console.log(books, 'from books')
    console.log(book , 'ffrom bok')
    let bk = books.findIndex((x: { book: any; }) => x.book._id === book.id) 

    if(book.command === 'complain'){
      console.log(books[bk])
      books[bk].complains =  books[bk].complains ? 'true' : 'false'
      return [...books]
    
    }
    books.splice(bk, 1)
    return [...books];
    

 
  }

  returned(id:string){
    this._bs.returned(this.returnedbook, id).subscribe(
      res => {
        this.insertedbook.next({
          command: 'return',
          id: this.bookId
        })
      },
      err => {
        this.errormsg = err.message
      }
    )

  }

  getId(id:string, complain:string){
    this.bookId = id
    console.log(id)
    if(complain){
      this.info.complain = complain;
    }else{
      this.info.complain = ''
    }
  }

  complain(){
    this._bs.complain(this.info, this.bookId).subscribe(
      res => {
        this.complainmsg = res.message;
        this.insertedbook.next({
          command: 'complain',
          id: this.bookId
        })
      },
      err => {
        this.errormsg = err.message
      }
    )
  }


 

}
