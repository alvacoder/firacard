import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-settings',
  templateUrl: './board-settings.component.html',
  styleUrls: ['./board-settings.component.scss']
})
export class BoardSettingsComponent implements OnInit {
  bgs = [1, , 2, 3, 4, 5]
  constructor() { }

  ngOnInit(): void {
  }

}
