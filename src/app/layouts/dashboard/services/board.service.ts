import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BoardService {
  private apiUrl = environment.apiUrl;
  private readonly giphyApiKey = 'Ob8GgxituzC8giTc0hxNGaAyaLvqCi4i';
  private readonly unsplash = {
    accessKey: 'G23Oyg_KUbCM-DB_ksBHYpp03RkK1LU89GwFZfoaskw',
    secretKey: 'knWfkI28sIaE42oqafL0ASM2TYLMHOkoVNaqkGxkt9Y'
  };

  constructor(private http: HttpClient) { }

  giphySearch(q: string): Observable<any> {
    const params = {api_key: this.giphyApiKey, q};
    return this.http.get('https://api.giphy.com/v1/gifs/search', {params});
  }
  unsplashSearch(query: string): Observable<any> {
    const params = {client_id: this.unsplash.accessKey, query, per_page: '50'};
    return this.http.get(`https://api.unsplash.com/search/photos`, {params});
  }

  getUserBoards(): Observable<any>  {
    return this.http.get(`${this.apiUrl}/boards`);
  }
  createBoard(payload: any): Observable<any>  {
    return this.http.post(`${this.apiUrl}/boards/create`, payload);
  }
  updateBoard(payload: any): Observable<any> {
    const { boardTitle, recipientEmail, relationship} = payload;
    const body = {boardTitle, recipientEmail, relationship};
    return this.http.patch(`${this.apiUrl}/boards/${payload.boardId}`, body);
  }
  saveBoardUpdate(boardId: string, payload: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/boards/${boardId}`, payload);
  }
  getBoard(id: string): Observable<any>  {
    return this.http.get(`${this.apiUrl}/boards/${id}`);
  }
  createCard(boardId: string, body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/boards/${boardId}/create`, body);
  }
  updateCard(boardId: string, body: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/boards/${boardId}/card`, body);
  }
  createReminder(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reminders`, payload);
  }
  getReminders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reminders`);
  }
  inviteContributors(boardId: string, payload: any): Observable<any>  {
    return this.http.post(`${this.apiUrl}/boards/${boardId}/invite`, payload);
  }
  deliverBoard(boardId: string, payload: any): Observable<any>  {
    const {deliveryDate, ...restPayload } = payload;
    const body = deliveryDate ? {...restPayload, deliveryDate } : restPayload;
    const endpoint = deliveryDate ? 'schedule' : 'deliver';
    return this.http.post(`${this.apiUrl}/boards/${boardId}/${endpoint}`, body);
  }
  getBackgrounds(): Observable<any> {
    return this.http.get(`https://api.jsonbin.io/b/60859344f6655022c46b8508/1`);
  }
  getStripeClientSecret(items: any): Observable<any>  {
    const url = 'https://us-central1-location-api-1555020524649.cloudfunctions.net/app/create-payment-intent';
    return this.http.post(`${this.apiUrl}/boards/upgrade`, items);
  }
  getBoardTypes(): Observable<any> {
    return this.http.get(`https://firacard-express.herokuapp.com/v1/boardtypes`);
  }
}
