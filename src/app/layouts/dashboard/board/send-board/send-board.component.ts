import { ToastrService } from 'ngx-toastr';
import { BoardService } from './../../services/board.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-send-board',
  templateUrl: './send-board.component.html',
  styleUrls: ['./send-board.component.scss']
})
export class SendBoardComponent implements OnInit {
  @Input() board: any;
  @Input() boardUrl: string | undefined;
  @Output() emitEvent = new EventEmitter();

  recipientEmail: string | undefined;
  loading = {save: false, deliver: false};
  showDeliveryDate = false;
  deliveryDate: any;

  constructor(
    private boardSrv: BoardService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
      this.recipientEmail = this.board.recipientEmail;
  }
  deliverBoardNow(): void {
    const {boardUrl, board} = this;
    const payload = {
      boardUrl, boardTitle: board.boardTitle,
      recipientEmail: [this.recipientEmail],
      deliveryDate: this.showDeliveryDate ? this.deliveryDate : ''
    };
    this.loading.deliver = true;
    this.boardSrv.deliverBoard(board.boardId, payload).subscribe(res => {
      this.toggleShowDelDate(false);
      this.closeSendBoardModal();
      this.toastr.success(res.message);
    }, err => {
      this.toastr.error(err.error.message);
    }).add(() => this.loading.deliver = false);
  }
  saveChanges(): void {
    const payload = {...this.board, recipientEmail: this.recipientEmail};
    this.loading.save = true;
    this.boardSrv.updateBoard(payload).subscribe((res) => {
      this.toastr.success(res.message);
      this.closeSendBoardModal();
    }, err => {
      this.toastr.error(err.error.message);
    }).add(() => this.loading.save = false);
  }
  closeSendBoardModal(): void {
    document.getElementById('closeSendBoardModalBtn')?.click();
  }
  toggleShowDelDate(condition: boolean): void {
    this.showDeliveryDate = condition;
    this.deliveryDate = '';
  }
  copyDirectLink(): void {
    this.emitEvent.emit({type: 'copy_direct_link'});
  }
}
