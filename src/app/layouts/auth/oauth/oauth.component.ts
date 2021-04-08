import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService as NgSocialLoginAuthSrv } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../auth.service';


@Component({
  selector: 'app-oauth',
  templateUrl: './oauth.component.html',
  styleUrls: ['./oauth.component.scss']
})
export class OauthComponent implements OnInit {
  @Input() page = 'auth';
  loading = {facebook: false, google: false};
  constructor(
    private authSrv: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private ngSocialLoginAuthSrv: NgSocialLoginAuthSrv) {
     }

  ngOnInit(): void {}
  googleLogin(): void {
    if (this.loading.facebook || this.loading.google) {return; }
    this.ngSocialLoginAuthSrv.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
      const payload = {email: res.email, firstName: res.firstName, lastName: res.lastName};
      this.oauthLogin(payload, 'google');
    }).catch(err => {
      this.toastr.error('Google login failed');
    });
  }
  facebookLogin(): void {
    if (this.loading.facebook || this.loading.google) {return; }
    this.ngSocialLoginAuthSrv.signIn(FacebookLoginProvider.PROVIDER_ID).then((res: any) => {
      const payload = {email: res.email, firstName: res.firstName, lastName: res.lastName};
      this.oauthLogin(payload, 'facebook');
    }).catch(err => {
      this.toastr.error('Facebook login failed');
      console.log(err);
    });
  }
  oauthLogin(payload: any, provider: 'facebook' | 'google'): void {
    this.loading[provider] = true;
    this.authSrv.oauthLogin(payload.res).subscribe(res => {
      this.authSrv.storeUserToken(res.token);
      this.toastr.success('Oauth Login successful').onShown.subscribe(() => {
        this.successLoginAction();
      });
    }, err => {
      this.toastr.error('Oauth Login: Error occured try again!');
    }).add(() => {
      this.loading[provider] = false;
    });
  }
  successLoginAction(): void {
    const  { redirectUrl } = this.route.snapshot.queryParams;
    this.router.navigate([redirectUrl || '/dashboard']);
  }

}
