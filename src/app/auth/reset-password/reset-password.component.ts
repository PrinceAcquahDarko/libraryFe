import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  show = false;
  errormsg!: string

  registerForm: FormGroup = this.fb.group({


    passwordGroup: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {validators: passwordMatcher}),

  })
  userEmail:any
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _as:AuthService, 
    private router:Router) { }

  ngOnInit(): void {
    this.userEmail = this.route.snapshot.paramMap.get("email")

  }

  updatePassword(){
    this.show = true
    let password = this.formatValue();

    this._as.updatePassword(password, this.userEmail).subscribe(
      res =>{
        this.show = false;
        this.router.navigate(['auth/login'])

      },
      err => {
        this.show = false;
        this.errormsg = err.message
        console.log(err)
      }

    )


  }

  formatValue(){
    return {
      password : this.registerForm.value.passwordGroup.password
    }
  }

}
