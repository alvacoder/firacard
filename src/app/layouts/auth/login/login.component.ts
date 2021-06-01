import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });
  loading = false;
  submitted = false;
  isShowPwd = false;

  f = (field: string) => this.form.controls[field];
  showPwd = () => this.isShowPwd = !this.isShowPwd;

  constructor(
    private authSrv: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {}

  login(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.authSrv.login(this.form.value).subscribe(res => {
        const token = res.token;
        this.authSrv.storeUserToken(token);
        this.toastr.success('Login successful').onShown.subscribe(() => {
          const  { redirectUrl } = this.route.snapshot.queryParams;
          this.router.navigate([redirectUrl || '/dashboard']);
        });
      }, err => {
        const { message , statusCode } = err.error;
        const msg = statusCode === 400 ? 'invalid email or password' : message;
        this.toastr.error(msg);
      }).add(() => this.loading = false);
    }
  }

}
