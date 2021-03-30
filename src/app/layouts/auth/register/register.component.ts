import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
    private router: Router
    ) { }

  ngOnInit(): void {}

  createUser(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.authSrv.register(this.form.value).subscribe(res => {
        const token = res.token;
        this.authSrv.storeUserToken(token);
        this.toastr.success('Account created successfully').onShown.subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
      }).add(() => this.loading = false);
    }
  }

}
