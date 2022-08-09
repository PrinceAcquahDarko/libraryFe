import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/book/book.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  errormsg = ''
  show = false;
  book:any
  bookId:any
  filedetails = {
    title: '',
    author: '',
    category: '',
    Image: ''
  }

  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.filedetails.Image = file
    }
  }
  constructor(private _as : AdminService, private _bs:BookService, private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get("bookId")
    this.getBook();

  }

    getBook(){
     return this._bs.getBookById(this.bookId).subscribe(
        res => {
          if(res.book){
          this.filedetails.author = res.book[0].author;
           this.filedetails.title = res.book[0].title;
           this.filedetails.category = res.book[0].category;
          }else{
           this.filedetails.author = res.author;
           this.filedetails.title = res.title;
           this.filedetails.category = res.category;
          }
        },
        err => console.log(err)
      )
  }

  updateBook(){
    this.show = true
    if(this.filedetails.Image){
      const formdata = new FormData()
      formdata.append('Image', this.filedetails.Image)
      formdata.append('title', this.filedetails.title)
      formdata.append('author', this.filedetails.author)
      formdata.append('category', this.filedetails.category)
      this._as.updateBook(formdata, this.bookId).subscribe(
        res => {
          this.show = false;
        this.router.navigateByUrl('/book', {state: res.updatedBook})

  
        },
        err => {
          this.errormsg = err.message;
          this.show = false;
        }
      )
    }else{
      this._as.updateBook(this.filedetails, this.bookId).subscribe(
        res => {
          this.show = false;
        this.router.navigateByUrl('/book', {state: res.updatedBook})

  
        },
        err => {
          this.errormsg = err.message;
          this.show = false;
        }
      )
    }
   
    

  }

}
