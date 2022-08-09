import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-upload-book',
  templateUrl: './upload-book.component.html',
  styleUrls: ['./upload-book.component.css']
})
export class UploadBookComponent implements OnInit {
  errormsg = ''
  show = false;
  filedetails = {
    title: '',
    author: '',
    category: '',
    Image: ''
  }
  constructor(private _as: AdminService, private router:Router) { }

  selectImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.filedetails.Image = file
    }
  }
  ngOnInit(): void {
  }

  uploadMedia(){
    console.log(this.filedetails)
    const formdata = new FormData()
    formdata.append('Image', this.filedetails.Image)
    formdata.append('title', this.filedetails.title)
    formdata.append('author', this.filedetails.author)
    formdata.append('category', this.filedetails.category)
    this._as.uploadBook(formdata).subscribe(
      res => {
        this.show = false;
        this.router.navigateByUrl('/book', {state: res.uploadedBook})


      },
      err => {
        this.errormsg = err.message;
        this.show = false;
      }
    )

  }

}
