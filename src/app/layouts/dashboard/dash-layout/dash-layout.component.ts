import { Router } from '@angular/router';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-layout',
  templateUrl: './dash-layout.component.html',
  styleUrls: ['./dash-layout.component.scss']
})
export class DashLayoutComponent implements OnInit {

  constructor(
    private authSrv: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.authSrv.userTokenSubject.subscribe(res => {
      if (res) {
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
    });
  }
}
