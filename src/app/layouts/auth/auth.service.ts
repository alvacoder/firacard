import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly storageKey = 'FiraCard_User';
  public userTokenSubject: BehaviorSubject<string>;
  public userDetailSubject!: BehaviorSubject<{id: any}>;
  //vyzibe@mailinator.com;

  constructor(private http: HttpClient) {
    const storageToken: any = localStorage.getItem(this.storageKey);
    this.userTokenSubject = new BehaviorSubject(storageToken);
    let detail;
    this.userTokenSubject.subscribe(token => {
      if (token) {
        const decodedToken: any = jwt_decode(token);
        detail = {
          id: decodedToken._id,
        };
      }
    });
    this.userDetailSubject = new BehaviorSubject(detail || ({} as any));
   }

  register(payload: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signup`, payload);
  }
  login(payload: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, payload);
  }
  oauthLogin(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/oauth`, payload);
  }

  get userToken(): string {
    return this.userTokenSubject.value;
  }
  storeUserToken(token: string): void {
    localStorage.setItem(this.storageKey, token);
    this.userTokenSubject.next(token);
  }
  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.userTokenSubject.next('');
  }
}
