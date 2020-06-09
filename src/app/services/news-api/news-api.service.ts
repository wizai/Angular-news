import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {

  constructor(private http: HttpClient) {}

  getSources() {
    return this.http.post(`${environment.API_URL}/news/sources`, {news_api_token: environment.NEWS_API_KEY});
  }

  getArticles(source, keyword) {
    return this.http.post(`${environment.API_URL}/news/${source}/${keyword}`, {news_api_token: environment.NEWS_API_KEY});
  }

  getArticlesByCountry(country) {
    return this.http.get(`${environment.NEWS_API_URL}/top-headlines?country=${country}&apiKey=${environment.NEWS_API_KEY}`);
  }

  getArticlesByWord(word) {
    return this.http.get(`${environment.NEWS_API_URL}/everything?q=${word}&apiKey=${environment.NEWS_API_KEY}`);
  }
}
