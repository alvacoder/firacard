import { BoardService } from './../services/board.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  searchValue = '';
  searchLoading = false;
  activateNav = '';
  viewType: 'default' | 'online' | 'upload' = 'default';
  selectedMedia: string | undefined;
  data = {gifs: null, images: null};

  constructor(
    private boardSrv: BoardService,
    public location: Location) { }

  ngOnInit(): void {}

  searchGiphy(): void {
    this.searchLoading = true;
    this.data.gifs = null;
    this.boardSrv.giphySearch(this.searchValue).subscribe(res => {
      this.data.gifs = res.data;
    }).add(() => this.searchLoading = false);
  }
  saerchUnslash(): void {
    this.searchLoading = true;
    this.data.images = null;
    this.boardSrv.unsplashSearch(this.searchValue).subscribe(res => {
      this.data.images = res.results;
    }).add(() => this.searchLoading = false);
  }
  showNav = (nav: string) => {
    if (this.selectedMedia) {return; }
    this.data = {gifs: null, images: null};
    this.viewType = 'default';
    this.activateNav = nav;
    this.searchValue = '';
  }
  changeView(viewType: any): void {
    this.viewType = viewType;
  }
  selectMedia(media: any): void {
    this.selectedMedia = media;
  }
  readURL(input: any, id = 'imgIDSelector'): void {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        document.getElementById(id)?.setAttribute('src', e.target?.result);
      };
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }
  browseFile(id: string): void {
    document.getElementById(id)?.click();
  }
  uploadImage(event: Event): void {
    this.selectedMedia = 'image-blob';
    this.readURL(event.target);
  }
  uploadVideo(event: any): void {
    const blobURL = URL.createObjectURL(event.target?.files[0]);
    this.selectedMedia = blobURL;
    this.readURL(event.target, 'videoIDSelector');
    // document.getElementById('videoIDSelector')?.setAttribute('src', blobURL);
  }

}
