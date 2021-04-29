import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.scss']
})
export class DashLayoutComponent implements OnInit, AfterViewInit {

  constructor(
    public authSrv: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.authSrv.userTokenSubject.subscribe(res => {
      if (res && res.length) {
        this.getProfile();
      }
    });
  }


  logout(): void {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }
  getProfile(): void {
    this.authSrv.getProfile().subscribe(res => {
      const body = res.payload;
      this.authSrv.userDetailSubject.next(body);
    }, err => {
      console.log('dasherror', err.error.message);
    });
  }
}
