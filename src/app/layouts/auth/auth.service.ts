import { environment } from './../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserI {
  email: string;
  _id: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly storageKey = 'FiraCard_User';
  public userTokenSubject: BehaviorSubject<string>;
  public userDetailSubject = new BehaviorSubject<UserI>(({} as any));


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
  oauthLogin(payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/oauth`, payload);
  }
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`);
  }
  updateProfile(payload: any): Observable<any>  {
    return this.http.patch(`${this.apiUrl}/users/update`, payload);
  }
  updatePassword(payload: any): Observable<any>  {
    return this.http.patch(`${this.apiUrl}/users/updatepassword`, payload);
  }

  isUserLoggedIn(): boolean {
    return !!this.userToken;
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
