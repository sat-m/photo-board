import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-board-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Add a new board</h4>
      <button type="button" class="close" aria-label="Close" (click)="dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label for="boardName">Board name</label>
        <input ngbAutofocus type="text" class="form-control" id="boardName" #nameInput>
      </div>
    </div>
    <div class="modal-footer">
      <button  type="button" class="btn btn-outline-primary" (click)="addBoard(nameInput.value)">Add</button>
      <button type="button" class="btn btn-outline-dark" (click)="dismiss()">Cancel</button>
    </div>
  `
})
export class AddBoardModalComponent {
  constructor(public activeModal: NgbActiveModal) { }

  addBoard(boardName): void {
    if (!boardName) {
      return;
    } else {
      this.closeModal(boardName);
    }
  }

  closeModal(result): void {
    this.activeModal.close(result);
  }

  dismiss(): void {
    this.activeModal.dismiss('Modal dismissed');
  }
}
