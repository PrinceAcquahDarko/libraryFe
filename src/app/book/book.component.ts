import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { merge, Subject, scan, map, catchError, throwError, combineLatest, startWith } from 'rxjs';
import { BookService } from './book.service';
import { IBook } from './interface';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  plainSearch = ''
  userInfo = JSON.parse(localStorage.getItem('user')!)


  errormsg!:string

  private insertedbook = new Subject<any>()
  insertedBookAction$ = this.insertedbook.asObservable()

  private searchedptn = new Subject<string>();
  insertedSearchedptn$ = this.searchedptn.asObservable();


  allBooks$ = this._bs.getAllBooks().pipe(
    map(x => x.allBooks)
  );

  bookwithAdds$ = merge(
    this.allBooks$,
    this.insertedBookAction$
  ).pipe(
    scan((books: any[], book: any) => this.modifyProducts(books, book))
   
  )

  
  allBookWithSearch$ = combineLatest([
    this.bookwithAdds$,
    this.insertedSearchedptn$.pipe(
      startWith('')
    )
  ]).pipe(
    map(([books, book]) => {
        return books.filter((i: { title: string; }) => book ?  i.title.toLowerCase().includes(book.toLowerCase()) : true)
    
    }),
    catchError(err => {
    console.log(err, 'from err')
      this.errormsg = 'an unexpected error occured please try again later'
      return throwError(err)
    })
  )

  constructor(private _bs:BookService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

  }

  bookdetail(id:string){
    if(this.userInfo){
      return this.router.navigate(['bookdetail', {bookId: id}])
    }
    return this.router.navigate(['auth/login'])
  }

  modifyProducts(books: any, book: IBook | string): IBook[]{
    if(typeof(book) === 'string'){
      //delete
      let index: number = books.findIndex((x: { _id: string; }) => x._id === book)
      books.splice(index, 1)

      return [...books];
    }
    let bk = books.findIndex((x: { _id: string; }) => x._id === book._id) 

    if(bk >= 0){
      books[bk] = {...book}
      return [...books]
    }
      return [book, ...books]

 
  }

  search(event:any){
    this.searchedptn.next(this.plainSearch)
  }

  ngAfterViewInit(){
    let book = {...history.state}

    if(book._id){
      this.insertedbook.next(book)
    }
    if(book.res){
      this.insertedbook.next(book.res)

    }

  }



}
