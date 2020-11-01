import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBoards(): Observable<any> {
    return this.http.get(this.baseUrl + '/get-boards');
  }

  addBoard(boardData): Observable<any> {
    return this.http.post(this.baseUrl + '/add-board', { name: boardData });
  }

  updateBoard(updatedBoard): Observable<any> {
    return this.http.post(this.baseUrl + '/update-board', updatedBoard);
  }

  getTagsForImages(images): Observable<any> {
    return this.http.post(this.baseUrl + '/get-tags', { images });
  }
}
