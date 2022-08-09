import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Ilogin } from '../interface/interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm) registerForm: NgForm | undefined
  errormsg!: string
  emailmsg = "Please enter email"
  show = false

  @ViewChild('modall', {static:false}) modal: ElementRef | undefined;
  clickedElement:Subscription = new Subscription()

  get isValid(): boolean{
    return this.registerForm?.valid ? true : false
  }

  userCredentials: Ilogin = {
    email: '',
    password: ''
  }
  updatePass = {
    email: ''
  }
  constructor(private _as:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  loginUser(): void{
    if(this.isValid){
      this.show = true
      this._as.loginUser(this.userCredentials).subscribe(
        res => {
          console.log(res)
          let user = this.userDetails(res.load)
          localStorage.setItem('user', JSON.stringify(user));
          this.show = true;
          this.router.navigate(['/'])

        },
        err => {
          this.errormsg = err.message;
          this.show = false;
        }
      )
    }
  }

  userDetails(data:any){
    return{
      token:data.token,
      fullname : `${data.firstname}`,
      admin: data.admin
    }
  }


  confirmEmail(){

    if(this.updatePass.email){
      this._as.getToken(this.updatePass).subscribe(
        res => {
          this.emailmsg = res.message;
          this.modal?.nativeElement.click();

          this.router.navigate(['auth/token', {email: this.updatePass.email}])
        },
        err => {console.log(err)}
      )
    }
    
  }
  ngOnDestroy(){
    this.clickedElement.unsubscribe()
  }

}
