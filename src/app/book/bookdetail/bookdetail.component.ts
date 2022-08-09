import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {

  userInfo:any;
  book:any
  bookId: any

  constructor(private route: ActivatedRoute, private _bs:BookService, private router:Router) { 

   this.userInfo = JSON.parse(localStorage.getItem('user')!)
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get("bookId")
    this.getBook();
    
  }
  

  issuebook(){
    return this._bs.issueBook(this.bookId).subscribe(
      res => {
       console.log(res)
      },
      err => console.log(err)
    )
  }

  getBook(){
     return this._bs.getBookById(this.bookId).subscribe(
        res => {
          if(res.book){
          this.book = {...res.book[0]}
          }else{
           this.book = res
          }
        },
        err => console.log(err)
      )
  }


  updateBook(){
    this.router.navigate(['admin/updateBook', {bookId: this.bookId}])
  }

  deleteBook(){}


}
