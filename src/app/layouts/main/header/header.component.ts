import { AuthService } from 'src/app/layouts/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public authSrv: AuthService) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(id => {
      if (id) {
        (document as any).getElementById(id).scrollIntoView();
      }
    });
  }

}
