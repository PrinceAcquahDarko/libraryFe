import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-token-page',
  templateUrl: './token-page.component.html',
  styleUrls: ['./token-page.component.css']
})
export class TokenPageComponent implements OnInit {
  show = false;
  errormsg = '';
  userEmail:any
  userCredentials = {
    token: '',
  }
  constructor(private _as:AuthService,private router:Router, 
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userEmail = this.route.snapshot.paramMap.get("email")

  }

  validateToken(){
    this.show = true
    this._as.validateToken(this.userCredentials, this.userEmail).subscribe(
      res => {console.log(res); this.show = false; 
        this.router.navigate(['auth/reset-password', {email: this.userEmail}])
      },
      err => {this.errormsg = err; this.show = false}
    )
  }

}
