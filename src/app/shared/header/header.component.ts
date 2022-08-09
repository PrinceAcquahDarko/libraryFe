import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userInfo:any;

  constructor(private router:Router) { 
   this.userInfo = JSON.parse(localStorage.getItem('user')!)
  }

  ngOnInit(): void {
  }

  issuedbook():any{
    if(this.userInfo.admin){
     return this.router.navigate(['admin/issue'])
    }

    return this.router.navigate(['book/issue'])
  }

  auth(){
   if(this.userInfo){
     localStorage.clear()
   return window.location.reload()

   }
   return this.router.navigate(['auth/login'])

  }

  user(){
   return this.router.navigate(['auth/update-profile'])

  }

  allBooks(){
   return this.router.navigate(['/'])

  }
  
  createBook(){
    return this.router.navigate(['admin/upload'])
  }

}
