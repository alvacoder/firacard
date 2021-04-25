import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-board-settings',
  templateUrl: './board-settings.component.html',
  styleUrls: ['./board-settings.component.scss']
})
export class BoardSettingsComponent implements OnInit {
  @Output() emitEvent = new EventEmitter();
  @Input() board: any;
  bgs = [1, , 2, 3, 4, 5];
  backgrounds = [
    {
      type: 'pattern', headerColor: '#97B0CE', name: 'pattern1', slug: 'pattern1.png',
      background: 'https://s3.amazonaws.com/kudoboard-assets/templates/619/backgrounds/lowres/Es30NFBh.jpg'
    },
    {
      type: 'pattern', headerColor: '#B64D44', name: 'pattern2', slug: 'pattern2.png',
      background: 'https://s3.amazonaws.com/kudoboard-assets/templates/620/backgrounds/lowres/EUWHBsB8.jpg'
    },
    {
      type: 'pattern', headerColor: '#274140', name: 'solid1', slug: 'solid1.png',
      backgroundColor: '#9FBC96'
    },
    {
      type: 'pattern', headerColor: '#2D2926', name: 'solid2', slug: 'solid2.png',
      background: '#E47A71'
    }
  ];
  constructor() { }

  ngOnInit(): void {}

  changeBg(background: any): void {
    this.emitEvent.emit({action: 'changeBg', data: background});
  }

}
