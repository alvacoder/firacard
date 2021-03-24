import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { AuthService as NgSocialLoginAuthSrv } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss']
})
export class AuthMainComponent implements OnInit {

  constructor(
    private authSrv: AuthService,
    private ngSocialLoginAuthSrv: NgSocialLoginAuthSrv) { }

  ngOnInit(): void {}

  googleLogin(): void {
    this.ngSocialLoginAuthSrv.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }
  facebookLogin(): void {
    this.ngSocialLoginAuthSrv.signIn(FacebookLoginProvider.PROVIDER_ID).then((res: any) => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

}
