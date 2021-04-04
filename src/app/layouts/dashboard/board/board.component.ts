import { DomSanitizer } from '@angular/platform-browser';
import { BoardService } from './../services/board.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boardId!: string;
  navMenus = [
    {name: 'Send/Schedule', icon: 'send.svg', slug: 'send_schedule'},
    {name: 'View as recepient', icon: 'eye.svg', slug: 'view_as_recepient'},
    {name: 'Settings', icon: 'settings.svg', slug: 'settings'},
    {name: 'Invite Contributors', icon: 'invite-user.svg', slug: 'invite_contributors'},
    {name: 'Add to board', icon: 'plus.svg', slug: 'add_to_board'},
  ];
  board!: {
    boardTitle: string;
    cards: any[]
  };

  constructor(
    route: ActivatedRoute,
    private router: Router,
    public domSanitizer: DomSanitizer,
    private boardSrv: BoardService) {
      this.boardId = route.snapshot.params.id;
    }

  ngOnInit(): void {
    this.getBoard();
  }

  navClick(slug: string): void {
    switch (slug) {
      case 'add_to_board':
        this.router.navigate(['/dashboard/create-card', this.boardId]);
        break;
      case 'settings':
        document.getElementById('settingsModalId')?.click();
        break;
      default:
        break;
    }
  }
  getBoard(): void {
    this.boardSrv.getBoard(this.boardId).subscribe((res: any) => {
      this.board = res.payload[0];
    });
  }

}
