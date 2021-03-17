import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  navMenus = [
    {name: 'Send/Schedule', icon: 'send.svg', slug: 'send_schedule'},
    {name: 'View as recepient', icon: 'eye.svg', slug: 'view_as_recepient'},
    {name: 'Settings', icon: 'settings.svg', slug: 'settings'},
    {name: 'Invite Contributors', icon: 'invite-user.svg', slug: 'invite_contributors'},
    {name: 'Add to board', icon: 'plus.svg', slug: 'add_to_board'},
  ];
  cards = [1, 2, 3, 4, 5, 6, 7, 8]
  constructor() { }

  ngOnInit(): void {
  }

}
