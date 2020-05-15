import {Component, OnInit} from '@angular/core';
import { NewsApiService } from './services/news-api/news-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  Articles: Array<any>;
  Sources: Array<any>;

  constructor(private newsapi: NewsApiService) {
    console.log('app component constructor called');
  }

  ngOnInit() {
    console.log('hello')
    this.newsapi.initArticles().then(data => this.Articles = data.articles);
    this.newsapi.initSources().then(data => this.Sources = data.sources);
  }

  searchArticles(source) {
    console.log('selected source is: ' + source);
    this.newsapi.getArticlesByID(source).then(data => this.Articles = data.articles);
  }

}
