import { BoardService } from './../services/board.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  searchValue = '';
  searchLoading = false;
  gifs: any = [];
  activateNav = 'image';

  constructor(private boardSrv: BoardService) { }

  ngOnInit(): void {}

  searchGiphy(): void {
    this.searchLoading = true;
    this.gifs = [];
    this.boardSrv.giphySearch(this.searchValue).subscribe(res => {
      this.gifs = res.data;
    }).add(() => this.searchLoading = false);
  }
  saerchUnslash(): void {
    this.searchLoading = true;
    this.gifs = [];
    this.boardSrv.unsplashSearch(this.searchValue).subscribe(res => {
      this.gifs = res.results;
    }).add(() => this.searchLoading = false);
  }
  showNav = (nav: string) => {
    this.gifs = [];
    this.activateNav = nav;
  }
}
