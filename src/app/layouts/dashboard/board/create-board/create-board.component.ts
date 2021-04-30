import { BoardService } from './../../services/board.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {
  @Output() emitEvent = new EventEmitter();
  loading = false;
  @Input() board!: any;

  form = this.fb.group({
    boardTitle: ['', [Validators.required]],
    recipientEmail: ['', [Validators.required, Validators.email]],
    relationship: ['', Validators.required],
    recipients: this.fb.array([this.createRecp()])
  });

  get recpForm(): FormArray {return this.form.get('recipients') as FormArray; }
  constructor(
    private fb: FormBuilder,
    private boardSrv: BoardService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.board) {
      this.form.patchValue(this.board);
    }
  }

  get getRecpControls(): any[] {
    return ((this.form.get('recipients') as any).controls);
  }
  createRecp(): FormGroup {
    return this.fb.group({
      name: ['']
    });
  }
  addRecp(): void {
    this.recpForm.push(this.createRecp());
  }
  removeRecp(i: any): void {
    this.recpForm.removeAt(i);
  }

  createBoard(): void {
    if (this.form.valid) {
      const {boardTitle, recipientEmail } = this.form.value;
      const payload = {boardTitle, recipientEmail};
      this.loading = true;
      this.boardSrv.createBoard(payload).subscribe(() => {
        (document.querySelector('.close') as any).click();
        this.toastr.success('Board created successfully');
        this.emitEvent.emit(true);
      }, err => {
        this.toastr.error(err.error.message);
      }).add(() => this.loading = false);
    }
  }
  updateBoard(): void {
    if (this.form.valid) {
      const payload = {...this.form.value, boardId: this.board.boardId};
      this.loading = true;
      this.boardSrv.updateBoard(payload).subscribe(() => {
        (document.querySelectorAll('.close')[1] as any).click();
        this.toastr.success('Board updated successfully');
        this.emitEvent.emit(true);
      }, err => {
        this.toastr.error('update board error');
      }).add(() => this.loading = false);
    }
  }


}
