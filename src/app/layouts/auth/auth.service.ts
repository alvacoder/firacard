import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly storageKey = 'FiraCard_User';
  public userTokenSubject: BehaviorSubject<string>;
  //vyzibe@mailinator.com;

  constructor(private http: HttpClient) {
    const storageToken: any = localStorage.getItem(this.storageKey);
    this.userTokenSubject = new BehaviorSubject(storageToken);
   }

  register(payload: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signup`, payload);
  }
  login(payload: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, payload);
  }
  oauthLogin(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/oauth`, {email});
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
