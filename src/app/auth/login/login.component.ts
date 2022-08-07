import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  show = false
  get isValid(): boolean{
    return this.registerForm?.valid ? true : false
  }

  userCredentials: Ilogin = {
    email: '',
    password: ''
  }
  constructor(private _as:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  loginUser(): void{
    if(this.isValid){
      this.show = true
      this._as.loginUser(this.userCredentials).subscribe(
        res => {
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('fullname', JSON.stringify(res.fullname));
          this.router.navigate(['dashboard'])

        },
        err => {
          this.errormsg = err;
          this.show = false;
        },
        () => {
          this.show = false;
        }
      )
    }
  }

}
