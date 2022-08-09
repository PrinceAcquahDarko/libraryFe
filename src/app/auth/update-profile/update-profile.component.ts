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
  show = false
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
      }
    )
  }

  updateUser(){
    this.show = true
    this._as.updateUser(this.userCredentials).subscribe(
      res => {
        //alert
        this.show = false;
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

}
