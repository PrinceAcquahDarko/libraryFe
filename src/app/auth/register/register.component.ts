import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  show = false;
  errormsg!: string

  registerForm: FormGroup = this.fb.group({

    firstname: ['', [Validators.required]],

    lastname: ['', [Validators.required]],

    email: ['', [Validators.required, Validators.email]],

    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: passwordMatcher}),

  })
  constructor(private fb: FormBuilder, private _as:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(): void{
    if(this.registerForm?.valid){
      this.show = true;
      let data = this.formatValue()
      this._as.registerUser(data).subscribe(
        res => {
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('fullname', JSON.stringify(data.firstname, data.lastname));
          this.router.navigate(['dashboard'])
        },
        err => {
          console.log(err)
          this.errormsg = err;
          this.show = false

        },
        () => this.show = false
      )
    }
    // alert(this.registerForm.value)
  }

  formatValue(){
    return {
      firstname : this.registerForm.value.firstname,
      lastname : this.registerForm.value.lastname,
      email : this.registerForm.value.email,
      password : this.registerForm.value.passwordGroup.password
    }
  }

}
