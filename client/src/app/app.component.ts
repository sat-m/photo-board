import { Component, OnInit } from '@angular/core';
import { Board } from './interfaces/board';
import { ApiService } from './providers/api.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddBoardModalComponent } from './components/add-board-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  boards: Board[];
  selectedBoard: Board;
  imageUrl: string;
  modalRef: NgbModalRef;
  selectedBoardId: string;
  taggingLoading: boolean;
  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards(boardToSelect?): void {
    this.apiService.getBoards()
      .subscribe((data) => {
        console.log(data);
        this.boards = data.boards;

        if (!boardToSelect) {
          this.selectedBoard = JSON.parse(JSON.stringify(this.boards[0]));
          this.selectedBoardId = this.selectedBoard._id;
        } else {
          this.setSelectedBoard(boardToSelect._id);
        }
      });
  }

  setSelectedBoard(id): void {
    const selection = this.boards.find((item) => {
      return item._id === id;
    });
    this.selectedBoard = JSON.parse(JSON.stringify(selection));
    this.selectedBoardId = this.selectedBoard._id;
  }

  boardUpdated(): void {
    this.setSelectedBoard(this.selectedBoardId);
  }

  addImage(): void {
    // checking the basic pattern for url
    if (/^(ftp|http|https):\/\/[^ ']+$/.test(this.imageUrl)) {
      const newImage = {
        url: this.imageUrl,
        tags: []
      };
      this.selectedBoard.images.push(newImage);
      this.imageUrl = '';
    }
  }

  getTags(): void {
    this.taggingLoading = true;
    const imageList = [...this.selectedBoard.images];
    this.apiService.getTagsForImages(imageList)
      .subscribe((result) => {
        console.log(result);
        if (result.images) {
          this.selectedBoard.images = result.images;
        }
        this.taggingLoading = false;
      });
  }

  addBoard(): void {
    this.modalRef = this.modalService.open(AddBoardModalComponent, { size: 'sm' });
    this.modalRef.result
      .then((res) => {
        if (res) {
          this.apiService.addBoard(res)
            .subscribe((result) => {
              this.getBoards(result.board);
            });
        } else {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateBoard(): void {
    this.apiService.updateBoard(this.selectedBoard)
      .subscribe((result) => {
        this.getBoards(result.board);
      });
  }

  dismissChanges(): void {
    this.setSelectedBoard(this.selectedBoardId);
  }
}
