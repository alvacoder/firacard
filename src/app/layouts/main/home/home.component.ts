import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sliderInit();
  }

  sliderInit = () => {
    const glider = (window as any).Glider;
    if (glider) {
      const d = new glider(document.querySelector('.glider'), {
        slidesToShow: 3,
        dots: '#dots',
        draggable: true,
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        }
      });
      return d;
    }
  }

}
