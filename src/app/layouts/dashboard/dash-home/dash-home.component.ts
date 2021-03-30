import { BoardService } from './../services/board.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.scss']
})
export class DashHomeComponent implements OnInit {
  cards = [1, 2, 3, 4];
  activeTab = 'curratedCards';

  constructor(
    private route: ActivatedRoute,
    private boardSrv: BoardService) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(tab => {
      this.activeTab = tab || this.activeTab;
    });
    this.getBoards();
  }
  getBoards(): void {
    this.boardSrv.getUserBoards().subscribe(res => {
      console.log(res);
    });
  }

}
