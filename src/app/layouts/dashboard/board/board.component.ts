import { BoardSettingsComponent } from './board-settings/board-settings.component';
import { AuthService, UserI } from 'src/app/layouts/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BoardService } from './../services/board.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @ViewChild('boardSettingComp') boardSettingComp: BoardSettingsComponent | undefined;
  boardId!: string;
  className = 'default';
  contributorsEmail = '';
  laodingSendInvite = false;
  inputtedPwd = '';
  loadingVerify = false;
  pageMode = 'edit';
  showEditBtn = false;

  navMenus = [
    {name: 'Send/Schedule', icon: 'fa-paper-plane', slug: 'send_board'},
    {name: 'View as recepient', icon: 'fa-eye', slug: 'view_as_recepient'},
    {name: 'Settings', icon: 'fa-cogs', slug: 'settings'},
    {name: 'Invite Contributors', icon: 'fa-user-plus', slug: 'invite_contributors'},
    {name: 'Add to board', icon: 'fa-plus', slug: 'add_to_board'},
  ];
  board!: {
    boardTitle: string;
    cards: any[],
    creatorId: any;
    className?: any;
    isLocked: boolean;
    password: string;
  };
  userDetail!: UserI;
  seletedTemplate = {
    header_color: 'white',
    background_color: '',
    low_res_url: '/assets/img/board-banner.png',
    font_color: '#A1C042',
    id: -1
  };

  constructor(
    route: ActivatedRoute,
    private router: Router,
    public domSanitizer: DomSanitizer,
    private authSrv: AuthService,
    private toastr: ToastrService,
    private boardSrv: BoardService) {
      route.fragment.subscribe(res => this.pageMode = (res || this.pageMode));
      this.boardId = route.snapshot.params.id;
    }

  ngOnInit(): void {
    this.authSrv.userDetailSubject.subscribe(res => {
      this.userDetail = res;
    });
    if (this.boardId) {
    }
    this.getBoard();
  }
  eventEmitted(event: {type: string, data: any}): void {
    if (event.type === 'copy_direct_link') {
      this.copyDirectLink();
    } else if (event.type === 'changeBg') {
      this.changeBg(event.data);
    } else if (event.type === 'edit_recipient') {
      document.getElementById('sendBoardId')?.click();
    }
  }
  changeBg(data: any): void {
    this.seletedTemplate = data;
  }
  navClick(slug: string): void {
    switch (slug) {
      case 'add_to_board':
        this.router.navigate(['boards/create-card', this.boardId]);
        break;
      case 'view_as_recepient':
        this.viewAsRecipient('view');
        break;
      case 'settings':
        this.boardSettingComp?.toggleShowBgs(false);
        document.getElementById('settingsModalId')?.click();
        break;
      case 'invite_contributors':
          document.getElementById('inviteContrBtn')?.click();
          break;
      case 'send_board':
        document.getElementById('sendBoardId')?.click();
        break;
      default:
        break;
    }
  }
  getBoard(): void {
    this.boardSrv.getBoard(this.boardId).subscribe((res: any) => {
      this.board = res.payload[0];
      this.getBackgrounds();
    });
  }
  getYoutubeEmbedUrl(youtubeUrl: string): string {
    let url = youtubeUrl;
    if (youtubeUrl.includes('watch')) {
      const hashUrl = youtubeUrl.split('v=')[1];
      url = `https://www.youtube.com/embed/${hashUrl}`;
    }
    return url;
  }
  editCard(cardId: string): void {
    const queryParams = {cardId};
    this.router.navigate(['boards/create-card', this.boardId], {queryParams});
  }
  get boardLink(): string {
    return window.location.href;
  }
  sendInvite(): void {
    const payload = {
      contributorEmails: this.contributorsEmail.split(',').map(e => e.trim()),
      boardUrl: this.boardLink
    };
    this.laodingSendInvite = true;
    this.boardSrv.inviteContributors(this.boardId, payload).subscribe(res => {
      this.toastr.success('Invite sent successfully');
      this.contributorsEmail = '';
    }, err => {
      this.toastr.error(err.error.message);
    }).add(() => this.laodingSendInvite = false);
  }
  copyDirectLink(): void {
    const copyText: any = document.getElementById('contr_direct_link');
    copyText.classList.toggle('d-none');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    copyText.classList.toggle('d-none');
    this.toastr.success('The link has been copied to your clipboard.');
  }
  getBackgrounds(): void {
    this.boardSrv.getBackgrounds().subscribe(res => {
      const backgrounds: any = res.data;
      const background = backgrounds.find((bg: any) => bg.id == this.board.className);
      if (background) {
        this.seletedTemplate = background;
      }
    });
  }
  verifyPwd(): void {
    this.loadingVerify = true;
    setTimeout(() => {
      if (this.inputtedPwd === this.board.password) {
        this.board.isLocked = false;
      } else {
        this.toastr.error('That password is not valid. Please enter the password that the board creator shared with you.');
      }
      this.loadingVerify = false;
    }, 3000);
    console.log(this.inputtedPwd);
  }
  viewAsRecipient(condition: 'view' | 'edit'): void {
    this.pageMode = condition;
    this.showEditBtn = !this.showEditBtn;
  }
  handleDownloadBoard(): void {
    const filter = (node: any) => node.id !== 'downloadBtn';
    const wrapper: any = document.getElementById('board-container');
    htmlToImage.toPng(wrapper, {filter}).then((dataUrl: any) => {
        saveAs(dataUrl, `${this.board.boardTitle}.png`);
    }).catch(err => {
        console.log(err);
    });
  }

}
