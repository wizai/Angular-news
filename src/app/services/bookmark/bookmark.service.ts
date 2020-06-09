import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  apiUrl: string;
  private headers: any;
  private bookmarks: any;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL;
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  addToBookmarks(source) {
    return this.http.post(`${this.apiUrl}/bookmark`, {...source, token: localStorage.getItem('token')}, this.headers );
  }

  removeBookmark(bookmark) {
    const httpOptionsJson = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        token: localStorage.getItem('token'),
      },
    };
    return this.http.delete(`${this.apiUrl}/bookmark/${bookmark._id}`, httpOptionsJson);
  }
}
