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
  }


  logout(): void {
    this.authSrv.logout();
    this.router.navigate(['/login']);
  }
}
