import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean;
  private userId: string;
  private apiUrl: string;
  private token: string;
  private headers: any;
  private currentUser: BehaviorSubject<UserModel>;
  private authStatusListener = new Subject<boolean>();

  constructor( private http: HttpClient, private router: Router) {
    this.isAuthenticated = false;
    this.apiUrl = environment.API_URL;
    this.headers = {
      header: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.currentUser = new BehaviorSubject<any>(null);
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUser(token) {
    // console.log(this.getAuthData().token)
    const data = { token };
    return this.http
      .post(`${this.apiUrl}/me`, data, this.headers)
      .subscribe( (response: any) => {
        this.currentUser.next(response.data);
      }, error => {
        this.authStatusListener.next(false);
      }
    );
  }

  register(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    let userData: UserModel | FormData;
    userData = {
      firstname,
      lastname,
      email,
      password,
    };
    return this.http
      .post(`${this.apiUrl}/register`, userData, this.headers)
      .subscribe(() => {
        this.login(email, password);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  login(email: string, password: string) {
    const body = { password, email };
    this.http
      .post<{ token: string, userId: string }>(
        `${this.apiUrl}/login`,
        body, this.headers
      )
      .subscribe((response: any) => {
        const token = response.data.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.router.navigate(['/auth/profil']);
          // this.currentUser.next(response.data);
          this.getUser(token);
          this.userId = response.data.user._id;
          this.authStatusListener.next(true);
          this.saveAuthData(token, this.userId);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  autoAuthUser() {
    function checkProperties(obj) {
      for (const key in obj) {
        if (obj[key] !== null && obj[key] !== '') {
          return false;
        }
      }
      return true;
    }
    const authInformation = this.getAuthData();
    if (!checkProperties(authInformation)) {
      this.getUser(this.getAuthData().token);
    } else {
      return;
    }
  }

  logout() {
    this.http
      .get(`${this.apiUrl}/logout`)
      .subscribe(() => {
      this.token = null;
      this.isAuthenticated = false;
      this.authStatusListener.next(false);
      this.userId = null;
      this.clearAuthData();
      this.router.navigate(['/auth/login']);
      this.currentUser.next(null);
    });
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    return {
      token,
      userId
    };
  }

}
