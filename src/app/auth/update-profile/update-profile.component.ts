import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


function passwordMatcher(c: AbstractControl): { [key:string]: boolean } | null {

  const passwordControl = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (passwordControl?.pristine || confirmPassword?.pristine){
    return null;
  }
  if (passwordControl?.value === confirmPassword?.value){
    return null
  }
  return {'match': true}
}
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  errormsg = ''
  successmsg = ''
  show = false
  initial_name!:string
  userCredentials = {
    firstname: '',
    lastname: '',
    email: ''
  }
  registerForm: FormGroup = this.fb.group({

    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: passwordMatcher}),

  })
  constructor(private fb:FormBuilder, private _as:AuthService) { }

  ngOnInit(): void {
    this._as.getUser().subscribe(
      res => {
        this.userCredentials.firstname = res.loginUser.firstname;
        this.userCredentials.lastname = res.loginUser.lastname;
        this.userCredentials.email = res.loginUser.email;
        this.initial_name = res.loginUser.firstname
      }
    )
  }

  updateUser(){
    this.show = true
    this._as.updateUser(this.userCredentials).subscribe(
      res => {
        //alert
        this.show = false;
        this.successmsg = res.message
        console.log('changed successfully')
      },
      err => {
        this.show = false;
        this.errormsg = err.msg
      }
    )
  }

  updatePassword(){
    this.show = true
    let pass = this.formatValue()
    this._as.updateUser(pass).subscribe(
      res => {
        //alert
        this.show = false;
        this.successmsg = res.message
        if(this.initial_name !== this.userCredentials.firstname){
          this.changeFirstname()
        }

        console.log('changed successfully')
      },
      err => {
        this.show = false;
        this.errormsg = err.msg
      }
    )
  }

  
  formatValue(){
    return {
      password : this.registerForm.value.passwordGroup.password
    }
  }

  changeFirstname(){
    const user = JSON.parse(localStorage.getItem('user')!)
    user.fullname = this.userCredentials.firstname;
    localStorage.setItem('user', JSON.stringify(user));

  }

}
