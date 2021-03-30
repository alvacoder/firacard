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
}
