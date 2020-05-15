import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import {error} from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  apiKey = '18be628568e0469bbe75365552c3154f';

  constructor(private http: HttpClient) { }
  initSources(): Promise<any> {
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.apiKey).toPromise()
      .then( data => data)
      .catch(err => err);
  }
  initArticles(): Promise<any> {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + this.apiKey).toPromise()
      .then( data => data)
      .catch(err => err);
  }
  getArticlesByID(source: string): Promise<any> {
    return this.http.get('https://newsapi.org/v2/top-headlines?sources=' + source + '&apiKey=' + this.apiKey).toPromise()
    .then( data => data)
    .catch(err => err);
  }
}
