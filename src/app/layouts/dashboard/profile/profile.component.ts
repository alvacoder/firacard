import { AuthService } from 'src/app/layouts/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Timzones } from 'src/app/data/timezone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeTab = 'userBio';
  loading = {profile: false, pwd: false};
  timezones = Timzones;
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    timezone: new FormControl('', Validators.required),
  });
  pwdForm = new FormGroup({
    currentPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl('', Validators.required),
  });
  f =  (field: string) => this.form.controls[field];

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private authSrv: AuthService) {
      this.authSrv.userDetailSubject.subscribe(res => {
        this.form.patchValue(res);
      });
   }

  ngOnInit(): void {
    this.route.fragment.subscribe(tab => {
      this.activeTab = tab || this.activeTab;
    });
  }

  updateProfile(): void {
    if (this.form.valid) {
      this.loading.profile = true;
      this.authSrv.updateProfile(this.form.value).subscribe(res => {
        this.toastr.success('Profile updated successfully');
      }, () => {
        this.toastr.error('Profile update error');
      }).add(() => this.loading.profile = false);
    }
  }
  get pwdMatch(): boolean {
    const { newPassword, confirmNewPassword } = this.pwdForm.value;
    return newPassword === confirmNewPassword;
  }
  updatePwd(): void {
    if (this.pwdForm.valid) {
      this.loading.pwd = true;
      const {newPassword,  currentPassword} = this.pwdForm.value;
      this.authSrv.updatePassword({newPassword, currentPassword}).subscribe(res => {
        this.toastr.success('Password updated successfully');
      }, (err) => {
        const error = err.error.message || 'Password update error';
        this.toastr.error(error);
      }).add(() => this.loading.pwd = false);
    }
  }



}
